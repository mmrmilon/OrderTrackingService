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

        public Task<SyncDetails> SyncSpreadsheetDataToDb()
        {
            var range = $"{sheet}!A:F";
            SpreadsheetsResource.ValuesResource.GetRequest request =
                    _service.Spreadsheets.Values.Get(spreadsheetId, range);

            var response = request.Execute();
            IList<IList<object>> values = response.Values;
            if (values != null && values.Count > 0)
            {
                foreach (var row in values)
                {
                    // Print columns A to F, which correspond to indices 0 and 4.
                    Console.WriteLine("{0} | {1} | {2} | {3} | {4} | {5}", row[0], row[1], row[2], row[3], row[4], row[5]);
                }
            }
            else
            {
                Console.WriteLine("No data found.");
            }

            var result = new SyncDetails
            {
                TotalFetch = 0,
                TotalSync = 0
            };

            return Task.FromResult(result);
        }
    }
}
