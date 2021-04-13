using System;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class VolunteerCertificationController : Controller
    {
       
        private IVolunteerCertificationService _service;
        public VolunteerCertificationController(IVolunteerCertificationService service)
        {
            this._service = service;
        }

        [HttpPost("AddVolunteerCertification")]
        public IActionResult AddVolunteerCertification([FromBody] VolunteerCertification volunteerEventObject)
        {
            VolunteerCertification checkVolunteerCertification = null;

            if (volunteerEventObject != null)
            {
                checkVolunteerCertification = _service.GetVolunteerCertification(volunteerEventObject);
                if(checkVolunteerCertification == null)
                {
                    _service.AddVolunteerCertification(volunteerEventObject);
                    return StatusCode(200);
                     
                }
               return StatusCode(204);
            }
            return Ok(checkVolunteerCertification);
        }
    }
}