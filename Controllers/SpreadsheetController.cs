using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrderTrackingService.Repository.Interface;

namespace OrderTrackingService.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SpreadsheetController : ControllerBase
    {
        private readonly ILogger<SpreadsheetController> _logger;
        private readonly ISpreadsheetRepository _spreadsheetRepository;

        public SpreadsheetController(ILogger<SpreadsheetController> logger, ISpreadsheetRepository spreadsheetRepository)
        {
            _logger = logger;
            _spreadsheetRepository = spreadsheetRepository;
        }

        [HttpGet]
        [Route("SyncToDb")]
        public async Task<IActionResult> Get()
        {
            var result = await _spreadsheetRepository.SyncSpreadsheetDataToDb();

            return Ok(result);
        }
    }
}