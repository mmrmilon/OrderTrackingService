using Microsoft.EntityFrameworkCore;
using OrderTrackingService.Data;
using OrderTrackingService.Dtos;
using OrderTrackingService.Models;
using OrderTrackingService.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderTrackingService.Repository.Implement
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext context;

        public OrderRepository(ApplicationDbContext context)
        {
            this.context = context;
        }
        
        public async Task<IEnumerable<Orders>> GetAsync()
        {
            return await context.Orders.OrderByDescending(x => x.Id).ToListAsync();
        }

        public async Task<Orders> GetAsync(long orderId)
        {
            return await context.Orders.Where(x => x.Id == orderId).FirstOrDefaultAsync();
        }

        public async Task<Orders> Insert(Orders model)
        {
            context.Orders.Add(model);
            await context.SaveChangesAsync();
            return model;
        }

        public async Task<Orders> Update(Orders model)
        {
            context.Set<Orders>().Update(model);
            await context.SaveChangesAsync();

            return model;
        }

        public async Task<bool> Delete(long orderId)
        {
            var result = context.Orders.FirstOrDefaultAsync(x => x.Id == orderId);
            if (result != null)
            {
                context.Orders.Remove(await result);
                await context.SaveChangesAsync();
                return true;
            }
            else
                return false;
        }
    }
}
