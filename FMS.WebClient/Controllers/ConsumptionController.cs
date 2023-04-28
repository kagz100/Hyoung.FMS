using Microsoft.AspNetCore.Mvc;
using FMS.Application.Queries;
using MediatR;
using FMS.Application.Queries.GPSGATEServer.GetconsumptionReport;
using FMS.Domain.Entities.Auth;
using System.Globalization;

namespace FMS.WebClient.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ConsumptionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ConsumptionController (IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int fuelConsumptionReportID ,DateTime from , DateTime to )
        {
          
          //do validation here 
                     //reportid = 218

            int reportid = fuelConsumptionReportID;
            var fromDate =from;
            var toDate = to;

            var conn = new GPSGateConections
            {
                SessionID = "14F55F0B48F16F0B56708D29D7DF5E76",
                  };
            var query = new GetConsumptionReportQuery(conn, 218, fromDate, toDate);

            var results = await _mediator.Send(query);

            return Ok(results);

        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("Test endpoint");
        }



    }
}
