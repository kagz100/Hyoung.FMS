using FMS.Application.Queries.Database.EmployeeQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FMS.WebClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class EmployeeController : ControllerBase

    {
        private readonly IMediator _mediator;

        public EmployeeController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("getemployeelist")]
        public  async Task<IActionResult> GetEmployeeList()
        {
            var query = new GetEmployeeQuery();
            var employees = await _mediator.Send(query);
            return Ok(employees);
            }
    }
}
