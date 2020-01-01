using OrderTrackingService.Dtos;
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

        Task<Orders> GetAsync(long orderId);

        Task<Orders> Insert(Orders model);

        Task<Orders> Update(Orders model);

        Task<bool> Delete(long orderId);
    }
}
