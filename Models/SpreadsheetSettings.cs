using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderTrackingService.Models
{
    public class SpreadsheetSettings
    {
        public string ApplicationName { get; set; } //"SpreadsheetCrud";

        public string SpreadsheetId { get; set; } //"1jUReGOByQaxpQs3yVq7nrnvmWPq59YZ9XS3MP5SFc50";

        public string SheetName { get; set; } //"Sheet1";
        
        public string ColumnRange { get; set; } //$"{sheet}!A:I";
    }
}
