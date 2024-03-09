using AutoMapper;
using FMS.Application.Command.DatabaseCommand.ExpectedAVGCmd;
using FMS.Application.Command.DatabaseCommand.ExptAVGClassification;
using FMS.Application.Models;
using FMS.Application.ModelsDTOs.ExpectedAVG;
using FMS.Application.Queries.Database.ExpectedAvg;
using FMS.WebClient.Models.DatabaseViewModel.ExpectedViewModel;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FMS.WebClient.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ExpectedAVGController : ControllerBase
    {
       
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public ExpectedAVGController(IMediator mediator,IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;
        }


        [HttpGet("getlist")]
        public async Task<IActionResult> GetExpectedAVGList()
        {
            var query = new GetExpectedAVGQuery();
            var expectedAVGs = await _mediator.Send(query);
            return Ok(expectedAVGs);
        }

        [HttpGet("getlistbyvehiclebysite")]
        public async Task<IActionResult> GetExpectedAVGListByVehicleBySite(int vehicleId, int siteId)
        {
            var query = new GetExpectedAverageByVehicleBySite { VehicleId = vehicleId, SiteId = siteId };
            var expectedAVGs = await _mediator.Send(query);
            return Ok(expectedAVGs);
        }

        [HttpGet("classification/getlist")]
        public async Task<IActionResult> GetClassificationList()
        {
            var query = new GetExpectAVGClassificationlist();
            var classifications = await _mediator.Send(query);
            return Ok(classifications);
        }

        [HttpPost("classification/create")]
        public async Task <IActionResult> CreateExpClassfication([FromBody] ExpectedAVGClassficationDTO expectedAVGClassificationDto)
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


        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpectedAVGbyID(int id)
        {
            var query = new GetExpectedAVGByIdQuery { Id = id };
            var expectedAVG = await _mediator.Send(query);
            if (expectedAVG == null)
            {
                return NotFound();
            }
            return Ok(expectedAVG);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateExpectedAVG(int id, [FromBody] ExpectedAVGDto expectedAVGDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var command = new ExpectedAVGUpdateCmd
            {
                ExpectedAVGDto = expectedAVGDto
            };
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateExpectedAVG(List<ExpectedAVGViewModel> expectedAVGViewModel)
        {
          
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var map = _mapper.Map<List<ExpectedAVGDto>>(expectedAVGViewModel); // mapping to a list
           
                var command = new ExpectedAVGCreateCmd
                {
                    ExpectedAVGDto = map
                };
            try
            {
                var (created, duplicates) = await _mediator.Send(command);
                if (duplicates.Any())
                {
                    return Conflict($"Duplicates found: {duplicates.Count} items.");
                }
                return Ok(created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
            }

    }
}
