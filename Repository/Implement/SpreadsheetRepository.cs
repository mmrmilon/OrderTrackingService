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

namespace OrderTrackingService.Repository.Implement
{
    public class SpreadsheetRepository : ISpreadsheetRepository
    {
        private static readonly string[] scopes = { SheetsService.Scope.Spreadsheets };
        private const string applicationName = "SpreadsheetCrud";
        private const string spreadsheetId = "1Axx5agQqkLMVoBd2Z_mOf5rOm0lzJUbSR8Ea4y_QNas";
        private const string sheet = "Sheet1";
        
        private static SheetsService _service;
        private readonly GoogleCredential credential;

        private readonly ApplicationDbContext context;

        public SpreadsheetRepository(ApplicationDbContext context)
        {
            this.context = context;

            using (var stream = new FileStream("client_secret.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                    .CreateScoped(scopes);
            }

            // Create Google Sheets API service.
            _service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = applicationName,
            });
        }

        public async Task<SyncDetails> SyncSpreadsheetDataToDb()
        {
            try
            {
                int totalSync = 0;
                var range = $"{sheet}!A:I";
                var request = _service.Spreadsheets.Values.Get(spreadsheetId, range);

                var response = request.Execute();
                IList<IList<object>> list = response.Values;

                foreach (var row in list.Skip(1))
                {
                    var item = new Orders
                    {
                        Id = Guid.NewGuid(),
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

                    context.Orders.Add(item);
                    await context.SaveChangesAsync();
                    totalSync++;
                }

                var result = new SyncDetails
                {
                    TotalFetch = list.Count,
                    TotalSync = totalSync,
                    errorMessage = string.Empty
                };

                return result;
            }
            catch (Exception ex)
            {
                var result = new SyncDetails
                {
                    TotalFetch = 0,
                    TotalSync = 0,
                    errorMessage = ex.GetBaseException().Message
                };
                return result;
            }
        }
    }
}
