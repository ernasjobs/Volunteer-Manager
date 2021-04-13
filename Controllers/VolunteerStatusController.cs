using System;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class VolunteersStatusController : Controller
    {
        private IVolunteerStatusService _service;
        public VolunteersStatusController(IVolunteerStatusService service)
        {
            this._service = service;
        }
        [HttpGet("GetVolunteerStatuses")]
        public IActionResult GetAllVolunteerStatuses()
        {

            try
            {
                // throw new Exception();
                var allStatuses = _service.GetAllVolunteerStatuses();
                return Ok(allStatuses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}