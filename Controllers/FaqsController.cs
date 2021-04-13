using System;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class FaqsController : Controller
    {
        private IFrequentlyAskedQuestion _service;
        public FaqsController(IFrequentlyAskedQuestion service)
        {
            this._service = service;
        }
        [HttpGet("GetFaqs")]
        public IActionResult GetAllGetFaqs()
        {

            try
            {
                // throw new Exception();
                var allFaqs = _service.GetAllFaqs();
                return Ok(allFaqs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}