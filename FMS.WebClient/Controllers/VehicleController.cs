using AutoMapper;
using AutoMapper.Configuration.Annotations;
using FMS.Application.Command.DatabaseCommand.VehicleCmd;
using FMS.Application.Models;
using FMS.Application.Queries.Database.VehicleQuery;
using FMS.Domain.Entities;
using FMS.WebClient.Models.DatabaseViewModel.VehicleViewModel;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;

namespace FMS.WebClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {

        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public VehicleController(IMediator mediator,IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet("getlist")]
        public async Task<IActionResult> GetVehicleList()
        {
            var query = new GetVehicleQuery();

            var vehicles = await _mediator.Send(query);

            return Ok(vehicles);

        }


        [HttpGet("getVehicleById")]
        public async Task<IActionResult> GetVehicleByID(int id)
        {
            
            var query = new GetVehicleByIDQuery { Id = id };

            var vehicle = await _mediator.Send(query);

            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }


        [HttpGet("getsimplevehiclelist")]
        public async Task<IActionResult> GetSimpleVehicleList()
        {
            var query = new GetSimpleVehicleQuery();
            var vehicles = await _mediator.Send(query);
            return Ok(vehicles);
        }

        [HttpPut("UpdateVehicle/{vehicleId}")]
        public async Task<IActionResult> UpdateVehicle(int vehicleId, [FromBody] VehicleViewModel model)
        {


            if (vehicleId != model.VehicleId)
            {
                Console.WriteLine("BadRequest: vehicleId does not match model.VehicleID");

                return BadRequest();
            }


           var command = _mapper.Map<UpdatevehicleCommand>(model);

            var result = await _mediator.Send(command);
           
            if(result)
            {
                return NoContent();
            }
            else
            {
                Console.WriteLine("NotFound: vehicle not updated");
                return NotFound();
            }

        }
    }
}
