using FMS.Application.Command.DatabaseCommand.ExptAVGClassification;
using FMS.Application.Models;
using FMS.Application.Queries.Database.ExpectedAvg;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FMS.WebClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpectedAVGClassificationController : ControllerBase
    {

        private readonly IMediator _mediator;


        public ExpectedAVGClassificationController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("getlist")]
        public async Task<IActionResult> GetExpectedAVGClassification()
        {
            var query = new GetExpectAVGClassificationlist();
            var expectedAVGClassification = await _mediator.Send(query);
            return Ok(expectedAVGClassification);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateExpClassfication([FromBody] ExpectedAVGClassficationDTO expectedAVGClassificationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var command = new ExptAVGClassificationCreateCmd
            {
                ExpctAVGClassficationDTO = expectedAVGClassificationDto
            };
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateExpectedAVGClassification(int id, [FromBody] ExpectedAVGClassficationDTO expectedAVGClassificationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var command = new ExpectedAVGClassificationUpdateCmd
            {
                Id = id,
                Name = expectedAVGClassificationDto.Name,
                Description = expectedAVGClassificationDto.Description,
                IskmperLiter= expectedAVGClassificationDto.IskmperLiter

            };

            var result = await _mediator.Send(command);

            if (result == 0)
            {
                return NotFound();
            }

            return Ok();
        }




    }
}
