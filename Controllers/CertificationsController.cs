using System;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class CertificationsController : Controller
    {
        private ICertificationService _service;
        public CertificationsController(ICertificationService service)
        {
            this._service = service;
        }
        [HttpGet("GetCertifications")]
        public IActionResult GetCertifications()
        {

            try
            {
                // throw new Exception();
                var allCategories = _service.GetCertifications();
                return Ok(allCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}