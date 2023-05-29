using FMS.Application.Command.DatabaseCommand.EmployeeCmd;
using FMS.Application.Models.Employee;
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
        [HttpPost("create")]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeDto employeeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var command = new EmployeeCreateCmd
            {
                EmployeeDto = employeeDto
            };
            var result = await _mediator.Send(command);
            return Ok(result);
        }


        [HttpGet("getlist")]
        public async Task<IActionResult> GetEmployeeList()
        {
            var query = new GetEmployeeQuery();
            var employees = await _mediator.Send(query);
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var query = new GetEmployeeByIdQuery { Id = id};
            var employee = await _mediator.Send(query);

            if (employee == null)
            {
                return NotFound();
            }


            return Ok(employee);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateEmployee( int id, [FromBody] EmployeeDto employeeDto)
        {

            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var command = new EmployeeUpdateCmd
            {
               ID = id,
                EmployeeDto = employeeDto
            };

            var result = await _mediator.Send(command);

            if(result)
            {
                return NoContent();
            }

            else
            {
                return NotFound();
            }
        }

    }
}
