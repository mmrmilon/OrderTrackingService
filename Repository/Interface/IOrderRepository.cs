using OrderTrackingService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderTrackingService.Repository.Interface
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Orders>> GetAsync();

        Task<Orders> GetAsync(Guid orderId);

        Task<Orders> Insert(Orders model);

        Task<Orders> Update(Orders model);

        Task<bool> Delete(Guid orderId);
    }
}
