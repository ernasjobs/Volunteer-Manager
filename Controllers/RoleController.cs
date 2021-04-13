using System;
using Microsoft.AspNetCore.Mvc;
using test.Data.Services;

namespace test.Controllers
{
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        private IRoleService _service;
        public RolesController(IRoleService service)
        {
            this._service = service;
        }
        [HttpGet("GetRoles")]
        public IActionResult GetRoles()
        {

            try
            {
                // throw new Exception();
                var allUsers = _service.GetAllRoles();
                return Ok(allUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}