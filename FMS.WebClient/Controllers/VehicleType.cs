using FMS.Application.Queries.Database.VehicleTypeQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FMS.WebClient.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class VehicleType : ControllerBase
    {
       private readonly IMediator _mediator;
        public VehicleType(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("GetVehicleType")]
        public async Task<IActionResult> GetVehicleType()
        {
            var query = new GetVehicleTypeQuery();
            var vehicleTypes = await _mediator.Send(query);
            return Ok(vehicleTypes);
        }

    }
}
