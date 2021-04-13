using System;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private ICategoryService _service;
        public CategoriesController(ICategoryService service)
        {
            this._service = service;
        }
        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {

            try
            {
                // throw new Exception();
                var allCategories = _service.GetAllCategories();
                return Ok(allCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}