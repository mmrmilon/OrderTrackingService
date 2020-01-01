using System;
using System.ComponentModel.DataAnnotations;

namespace OrderTrackingService.Models
{
    public class Orders
    {
        [Key]
        public long Id { get; set; }

        public DateTime OrderDate { get; set; }

        public string OrderNumber { get; set; }

        public string CutomerName { get; set; }

        public string Address { get; set; }

        public string TrackingStatus { get; set; }

        public string StockKeepingUnit { get; set; }

        public string Carrier { get; set; }

        public string TrackingNumber { get; set; }

        public DateTime? ShipDate { get; set; }
    }
}
