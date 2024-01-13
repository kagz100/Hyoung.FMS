using System;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Security.Cryptography;
using FMS.Application.Command.DatabaseCommand.ATGCommands.TankMeasurementsCommand;
using Microsoft.Extensions.Configuration;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using FMS.Application.ModelsDTOs.ATG;
using FMS.Domain.Entities;
using Microsoft.Extensions.Logging;
using AutoMapper.Configuration.Annotations;
using FMS.Application.ModelsDTOs.ATG.Common;
using FMS.Application.Command.DatabaseCommand.ATGCommands.InTankDeliveryCommand;
using FMS.Application.Command.DatabaseCommand.ATGCommands.PumpTransactoinCommand;
using FMS.Application.Command.DatabaseCommand.ATGCommands.AlertRecordCommand;

namespace FMS.WebClient.Controllers;


    [ApiController]
    [Route("[controller]")]
 public class ATGController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
      private  readonly ILogger<ATGController> _logger;


        public ATGController(IMediator mediator, IConfiguration configuration , ILogger<ATGController> logger )
        {
            _logger = logger;
            _mediator = mediator;
            _configuration = configuration;
        }


    [HttpPost]
    [Route("testupload")]
    public async Task<IActionResult> TestUpload( )
    {
      
            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                JObject jsonRequest;
                try
                {
                    jsonRequest = JObject.Parse(body);
                }
                catch (JsonReaderException jex)
                {
                    _logger.LogError("Error parsing JSON request: {Message}", jex.Message);
                    return BadRequest("Invalid JSON format");
                }

                _logger.LogInformation("Request data: {RequestData}", jsonRequest.ToString());
                return Ok(jsonRequest);
            
        }

    }




    /// <summary>
    /// 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost]
    [Route("upload")] // The URI provided to the PTS-2 controller
    public async Task<IActionResult> Post()
    {
        string requestBody;
        string response = "";


        using (var reader = new StreamReader(Request.Body))
        {
            requestBody = await reader.ReadToEndAsync();
        }
          JObject jsonRequest;
        try
        {
            jsonRequest = JObject.Parse(requestBody);
        }
        catch (JsonReaderException jex)
        {
            _logger.LogError("Error parsing JSON request: {Message}", jex.Message);
            return BadRequest("Invalid JSON format");
        }

        if(jsonRequest == null)
        {
            return BadRequest("jsonRequest is null or improperly formatted");
        }

        var secretKey = _configuration["SecretKey"];

        // You would validate the HMAC signature here if you're using the SecretKey
        // This example assumes you have a method to validate the HMAC called ValidateHMAC
       // if (Request.Headers.TryGetValue("X-Data-Signature", out var signature) &&
        //    !await validateHMAC(signature,Request.Body,secretKey))
       // {
       //     return Unauthorized();
      //  }

 

        //TODO: Check if the Header X-Pts-Id is in the Database . If not return 401 with message "PTS ID not found"

        //extract headers 

        var ptsID = Request.Headers["X-Pts-Id"].ToString();

        //var jsonRequest = JsonConvert.DeserializeObject<JObject>(requestBody);

        try
        {
            var ptsRequestDTO = jsonRequest.ToObject<PtsRequestDto>();

            if (ptsRequestDTO == null || ptsRequestDTO.Packets == null || !ptsRequestDTO.Packets.Any())
            {
                _logger.LogError("Invalid or missing packet data");
                return BadRequest("Invalid or missing packet data");
            }

            foreach (var packet in ptsRequestDTO.Packets)
            {

                 string localResponse = string.Empty; 

                switch (packet.Type)
                {
                    case "UploadTankMeasurement":

                        var command = new CreateTankMeasurementCommand { PtsRequestDto = ptsRequestDTO };
                        localResponse = await _mediator.Send(command);
                        break;

                    case "UploadPumpTransaction":
                        var pumpCommand = new CreatePumpTransactionCommand { PtsRequestDto = ptsRequestDTO };
                        localResponse = await _mediator.Send(pumpCommand);
                       break;
                    case "UploadInTankDelivery":
                         var deliveryCommand = new CreateInTankDeliveryCommand { PtsRequestDto = ptsRequestDTO };
                        localResponse = await _mediator.Send(deliveryCommand);
                         break;
                    case "UploadAlertRecord":
                         var alertCommand = new CreateAlertRecordCommand { PtsRequestDto = ptsRequestDTO };
                         localResponse = await _mediator.Send(alertCommand);
                        break;
                    default:
                        _logger.LogError("Unknown request type: {RequestType}", packet.Type);
                        return BadRequest("Unknown request type");
                }
                if(!localResponse.Contains("OK"))
                {
                    return BadRequest(localResponse);
                }
            }

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the request");
            return BadRequest("An error occurred while processing the request");
        }
        return BadRequest("Request could not be processed");
    }


    private string CreateHmacSignature(string responseData)
    {
        var secretKey = _configuration["SecretKey"];
        var secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
        using (var hmac = new HMACSHA256(secretKeyBytes))
        {
            var responseBytes = Encoding.UTF8.GetBytes(responseData);
            var hash = hmac.ComputeHash(responseBytes);
            return Convert.ToBase64String(hash);
        }
    }
        public async Task<bool> validateHMAC(string receivedSignature, Stream requestBodyStream, string secretKey)
                {
                    using (var reader = new StreamReader(requestBodyStream))
                    {
                        var requestbody  = await reader.ReadToEndAsync();
                       
                        // Compute the hash from the request body and the secret key
                        var secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
                        using (var hmac = new HMACSHA256(secretKeyBytes))
                        {
                            var bodyBytes = Encoding.UTF8.GetBytes(requestbody);
                            var computedHash = hmac.ComputeHash(bodyBytes);
                            var computedSignature = Convert.ToBase64String(computedHash);

                            // Compare the computed signature with the received signature
                            return computedSignature == receivedSignature;
                        }


                    }
                }
            }
        