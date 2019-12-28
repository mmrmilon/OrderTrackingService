using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderTrackingService.Dtos
{
    public class OrderDto
    {
        public Guid Id { get; set; }

        public int UniqueKey { get; set; }

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
