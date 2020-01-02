using System;
using System.Collections.Generic;
using System.IO;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using OrderTrackingService.Data;
using OrderTrackingService.Models;
using OrderTrackingService.Repository.Interface;
using System.Linq;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using Microsoft.Extensions.Options;

namespace OrderTrackingService.Repository.Implement
{
    public class SpreadsheetRepository : ISpreadsheetRepository
    {
        private static readonly string[] scopes = { SheetsService.Scope.Spreadsheets };
        private readonly SpreadsheetSettings _spreadsheetSettings;
        private static SheetsService _service;
        private readonly GoogleCredential credential;
        private readonly ApplicationDbContext context;

        public SpreadsheetRepository(ApplicationDbContext context, IOptions<SpreadsheetSettings> spreadsheetSettings)
        {
            this.context = context;
            _spreadsheetSettings = spreadsheetSettings.Value;

            using (var stream = new FileStream("client_secret.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                    .CreateScoped(scopes);
            }

            // Create Google Sheets API service.
            _service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = _spreadsheetSettings.ApplicationName,
            });
        }

        /// <summary>
        /// https://github.com/borisdj/EFCore.BulkExtensions
        /// </summary>
        /// <returns></returns>
        public Task<SyncDetails> SyncSpreadsheetDataToDb()
        {
            int totalFetch = 0;
            int totalSync = 0;

            try
            {
                var range = $"{_spreadsheetSettings.SheetName}!{_spreadsheetSettings.ColumnRange}";
                var request = _service.Spreadsheets.Values.Get(_spreadsheetSettings.SpreadsheetId, range);

                var response = request.Execute();
                IList<IList<object>> list = response.Values;
                totalFetch = list.Count;

                var records = new List<Orders>();
                foreach (var row in list.Skip(1))
                {
                    var item = new Orders
                    {
                        OrderDate = DateTime.Parse(string.Format("{0}", row[0])),
                        OrderNumber = string.Format("{0}", row[1]),
                        CutomerName = string.Format("{0}", row[2]),
                        Address = string.Format("{0}", row[3]),
                        TrackingStatus = string.Format("{0}", row[4]),
                        StockKeepingUnit = string.Format("{0}", row[5]),
                        Carrier = string.Format("{0}", row[6]),
                        TrackingNumber = string.Format("{0}", row[7]),
                        ShipDate = string.Format("{0}", row[8]).ToUpper().Equals("N/A") ? (DateTime?)null : DateTime.Parse(string.Format("{0}", row[8]))
                    };
                    records.Add(item);
                }

                //Update into Order table
                var updateRecords = (from r in records
                                     join o in context.Orders on r.OrderNumber equals o.OrderNumber
                                     select new Orders
                                     {
                                         Id = o.Id,
                                         OrderDate = r.OrderDate,
                                         OrderNumber = o.OrderNumber,
                                         CutomerName = r.CutomerName,
                                         Address = r.Address,
                                         TrackingStatus = r.TrackingStatus,
                                         StockKeepingUnit = r.StockKeepingUnit,
                                         Carrier = r.Carrier,
                                         TrackingNumber = r.TrackingNumber,
                                         ShipDate = r.ShipDate
                                     }).ToList();

                //context.Database.EnsureCreated();
                context.ChangeTracker.AutoDetectChangesEnabled = true;
                context.BulkUpdate(updateRecords);
                totalSync += updateRecords.Count;

                //Insert into Order table
                var orderNumbers = updateRecords.Select(x => x.OrderNumber).Distinct().ToList();
                var insertRecords = records.Where(x => !orderNumbers.Contains(x.OrderNumber))
                    .Select(x =>
                    {
                        return x;
                    }).ToList();

                context.ChangeTracker.AutoDetectChangesEnabled = true;
                context.BulkInsert(insertRecords);
                totalSync += insertRecords.Count;

                var result = new SyncDetails
                {
                    TotalFetch = list.Count,
                    TotalSync = totalSync,
                    Status = "Succeed",
                    ErrorMessage = "Successfully sync items " + string.Format("{0}", totalSync) + " of " 
                    + string.Format("{0}", list.Count - 1)+", "+ updateRecords.Count + " items updated, " + insertRecords.Count+" items added."
                };

                return Task.FromResult(result);
            }
            catch (Exception ex)
            {
                var result = new SyncDetails
                {
                    TotalFetch = totalFetch,
                    TotalSync = totalSync,
                    Status = "Failed",
                    ErrorMessage = ex.GetBaseException().Message
                };
                return Task.FromResult(result);
            }
        }
    }
}
