using System;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class EventStatusController : Controller
    {
        private IEventStatusService _service;
        public EventStatusController(IEventStatusService service)
        {
            this._service = service;
        }
        [HttpGet("GetEventsStatuses")]
        public IActionResult GetAllEventStatuses()
        {

            try
            {
                // throw new Exception();
                var allStatuses = _service.GetAllEventStatuses();
                return Ok(allStatuses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}