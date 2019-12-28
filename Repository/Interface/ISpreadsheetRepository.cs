using OrderTrackingService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderTrackingService.Repository.Interface
{
    public interface ISpreadsheetRepository
    {
        Task<SyncDetails> SyncSpreadsheetDataToDb();
    }
}
