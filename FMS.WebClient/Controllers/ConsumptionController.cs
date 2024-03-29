﻿using Microsoft.AspNetCore.Mvc;
using FMS.Application.Queries;
using MediatR;
using FMS.Application.Queries.GPSGATEServer.GetconsumptionReport;
using FMS.Domain.Entities.Auth;
using System.Globalization;
using FMS.Application.Queries.GPSGATEServer.LoginQuery;
using FMS.WebClient.Models.DatabaseViewModel;
using FMS.Application.Command.DatabaseCommand.ConsumptionCmd;
using AutoMapper;
using FMS.Application.Command.DatabaseCommand.ConsumtionCmd.Update;

namespace FMS.WebClient.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ConsumptionController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public ConsumptionController (IMediator mediator, IConfiguration configuration,IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Get(DateTime from) 
        {
          //load settings from appsettings.json

          string? username = _configuration["GPSGateUser:Username"];
          string? password = _configuration["GPSGateUser:Password"];
          int?applicationID  = int.Parse(_configuration["ApplicationID"]??"0");
          int fuelConsumptionReportId = int.Parse(_configuration["FuelConsumptionReportID"]??"0");


            var fromDate =from.Date;
            var toDate = fromDate.AddDays(1).AddTicks(-1); //add one day to from date

          var loginquery = new LoginQuery{

            GPSGateConections = new GPSGateConections{
                GPSGateUser= new GPSGateUser 
                {
                    UserName = username,
                    Password = password
                },
                ApplicationID = applicationID.Value
            }
          };

             var conn = await _mediator.Send(loginquery);
          
            var query = new GetConsumptionReportQuery(conn ,fuelConsumptionReportId, fromDate, toDate);

            var results = await _mediator.Send(query);

            return Ok(results);

        }

        [HttpPost("Create")]
        public async Task<IActionResult> ConsumptionCreate([FromBody] ConsumptionViewModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
         
            var command = _mapper.Map<ConsumptionCreateCmd>(model);

            await _mediator.Send(command);

            return Ok();

        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> ConsumptionUpdate(int id, [FromBody] ConsumptionViewModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
         
            var command = _mapper.Map<ComsumptionUpdateCmd>(model);

            command.Id = id;

            await _mediator.Send(command);

            return Ok();

        }




        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("Test endpoint");
        }



    }
}
