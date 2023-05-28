using FMS.Application.Queries.Database.VehicleManufacturer;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FMS.WebClient.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class VehicleManufacturerController : ControllerBase
    {

        private readonly IMediator _mediator;

        public VehicleManufacturerController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("getlist")]
        public async Task<IActionResult> GetVehicleManufacturer()
        {
            var query = new GetVehicleManufacturerQuery();
            var vehicleManufacturer= await _mediator.Send(query);

            return Ok(vehicleManufacturer);
        }
    }
}
