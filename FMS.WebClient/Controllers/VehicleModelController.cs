using FMS.Application.Command.DatabaseCommand.VehicleModelCmd;
using FMS.Application.Models;
using FMS.Application.Queries.Database.VehicleModelQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FMS.WebClient.Controllers
{


    [ApiController]
    [Route("api/[controller]")]

    public class VehicleModelController : ControllerBase
    {


        private readonly IMediator _mediator;

        public VehicleModelController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetVehicleModel")]
        public async Task<IActionResult> GetVehicleModel()
        {

            var query = new GetVehicleModelQuery();
            var vehicleModels = await _mediator.Send(query);
            return Ok(vehicleModels);

        }
        [HttpGet("GetVehicleModelsByManufacturerId/{manufacturerId}")]
        public async Task<ActionResult<List<VehicleModelDto>>> GetVehicleModelsByManufacturerId(int manufacturerId)
        {
            return await _mediator.Send(new GetVehicleModelsByManufacturerIdQuery { ManufacturerId = manufacturerId });
        }

        [HttpPost("CreateVehicleModel")]
        public async Task<ActionResult<int>> CreateVehicleModel(CreateVehicleModelCommand command)
        {
            int vehicleModelId = await _mediator.Send(command);
            return Ok(vehicleModelId);
        }




    }
}
