using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrderTrackingService.Models;
using OrderTrackingService.Repository.Interface;

namespace OrderTrackingService.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderRepository _orderRepository;

        public OrderController(ILogger<OrderController> logger, IOrderRepository orderRepository)
        {
            _logger = logger;
            _orderRepository = orderRepository;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> Get()
        {
            var result = await _orderRepository.GetAsync();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetBy/{orderId}")]
        public async Task<IActionResult> Get(Guid orderId)
        {
            var result = await _orderRepository.GetAsync(orderId);

            return result != null ? (IActionResult)Ok(result) : NotFound();
        }

        [HttpPost]
        [Route("Insert")]
        public async Task<IActionResult> Post([FromBody] Orders model)
        {
            return Ok(await _orderRepository.Insert(model));
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Put([FromBody] Orders model)
        {
            return Ok(await _orderRepository.Update(model));
        }

        [HttpDelete]
        [Route("Delete/{orderId}")]
        public async Task<IActionResult> Delete(Guid orderId)
        {
            return Ok(await _orderRepository.Delete(orderId));
        }

    }
}