using FMS.Application.Command.DatabaseCommand.VehicleCmd;
using FMS.Application.Command.DatabaseCommand.VehicleModelCommand;
using FMS.Application.Models;
using FMS.Application.Queries.Database.VehicleModelQuery;
using FMS.Domain.Entities;
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

       [HttpPost("CreateVehicleModel")]
        public async Task<ActionResult<int>> CreateVehicleModel([FromBody] Vehiclemodel vehicleModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var command = new CreateVehicleModelCommand { ManufacturerId = vehicleModel.ManufacturerId, Name = vehicleModel.Name} ;
           
           try{
            var model = await _mediator.Send(command);
            return Ok(model);
           }
              catch (Exception ex)
              {
               return StatusCode(500,ex.Message);
              }
        }



        [HttpGet("getlist")]
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

        




    }
}
