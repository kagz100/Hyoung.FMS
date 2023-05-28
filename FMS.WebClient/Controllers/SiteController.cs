using FMS.Application.Queries.Database.SiteQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FMS.WebClient.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class SiteController : ControllerBase
    {

        private readonly IMediator _mediator;

        public SiteController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //return list of sites
        [HttpGet("getlist")]
        public async Task<IActionResult> GetSiteList()
        {

           var query = new GetSiteQuery();
            var sites =await _mediator.Send(query);
            return Ok(sites);

        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("Test endpoint");
        }

    }
}
