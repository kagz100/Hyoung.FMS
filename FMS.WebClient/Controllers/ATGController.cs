using System;
using NLog;
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
using FMS.Application.Common;
using Microsoft.AspNetCore.SignalR;
using FMS.WebClient.Signal;
using FMS.Domain.ATGStatus;
using FMS.Application.Command.SignalCommand;

namespace FMS.WebClient.Controllers;


    [ApiController]
    [Route("ATG")]
 public class ATGController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
      private  readonly ILogger<ATGController> _logger;
    private readonly IHubContext<PtsStatusHub> _hubContext;




        public ATGController(IMediator mediator, IConfiguration configuration , ILogger<ATGController> logger ,IHubContext<PtsStatusHub> hubContext  )
        {
            _logger = logger;
            _mediator = mediator;
            _configuration = configuration;
           _hubContext = hubContext;
        }



    [HttpPost]
    [Route("test")]
    public async Task<IActionResult> Test()
    {
        string requestBody;


        using (var reader = new StreamReader(Request.Body))
        {
            requestBody = await reader.ReadToEndAsync();
        }

        try
        {
            var jsonRequest = JObject.Parse(requestBody);
                _logger.LogInformation(1,jsonRequest.ToString());
                var ptsRequestDTO = jsonRequest.ToObject<PtsRequestDto>();

            if (ptsRequestDTO == null || ptsRequestDTO.Packets == null || !ptsRequestDTO.Packets.Any())
            {
                return BadRequest("Invalid or missing packet data");
            }

            // Assuming you want to respond with the first packet's ID and a custom message
            var firstPacketId = ptsRequestDTO.Packets.First().Id;

            var confirm = ConfirmationMessage.Success(firstPacketId, "UploadTankMeasurement", "OK");
            var response = new ContentResult
            {
                
                Content = confirm,
                ContentType = "application/json; charset=utf-8",
                StatusCode = 200
            };
            Response.Headers["Connection"] = "close";


            //_logger.LogInformation(confirm.ToString(),"Response");
            return response;
        }
        catch (Exception ex)
        {
            // Log the exception here
            return BadRequest(ConfirmationMessage.Error(0, "Error", 500, ex.Message));
        }
    }




    /// <summary>
    /// 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost]
    [Route("post")] // The URI provided to the PTS-2 controller
    public async Task<IActionResult> Post()
    {
        string requestBody;


        using (var reader = new StreamReader(Request.Body))
        {
            requestBody = await reader.ReadToEndAsync();
        }
         
        try
        {
            var jsonRequest = JObject.Parse(requestBody);
      

        if(jsonRequest == null)
        {
                _logger.LogError("jsonRequest is null or improperly formatted");
            return BadRequest("Invalid or missing packet data");
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

       
            var ptsRequestDTO = jsonRequest.ToObject<PtsRequestDto>();


            if (ptsRequestDTO == null || ptsRequestDTO.Packets == null || !ptsRequestDTO.Packets.Any())
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid or missing packet data");
                //_logger.LogError("Invalid or missing packet data");
                return BadRequest("Invalid or missing packet data");
            }

            bool isUploadStatus = false;

            List<string> responses = new List<string>();
            foreach (var packet in ptsRequestDTO.Packets)
            {

                    string localResponse = string.Empty;

                    switch (packet.Type)
                    {

                        case "UploadStatus":

                            isUploadStatus = true;
                            var command = new UploadStatusCommand { Data = packet.Data };

                        //do other processing here too 
                       var  uploadStatus =  await _mediator.Send(command);

                        //convert loca

                            await _hubContext.Clients.All.SendAsync("ReceiveStatusUpdate", uploadStatus);

                            //process the update status
                            var confirmation = ConfirmationMessage.Success(packet.Id, "UploadStatus", "OK");
                            responses.Add(confirmation);
                            break;

                        case "UploadTankMeasurement":

                            var tankcommand = new CreateTankMeasurementCommand { PtsRequestDto = ptsRequestDTO };
                            //_logger.Log(LogLevel.Debug, packet.ToString());
                            localResponse = await _mediator.Send(tankcommand);
                            responses.Add(localResponse);
                            break;

                        case "UploadPumpTransaction":
                            var pumpCommand = new CreatePumpTransactionCommand { PtsRequestDto = ptsRequestDTO };
                            localResponse = await _mediator.Send(pumpCommand);
                            responses.Add(localResponse);
                            break;
                        case "UploadInTankDelivery":
                            var deliveryCommand = new CreateInTankDeliveryCommand { PtsRequestDto = ptsRequestDTO };
                            localResponse = await _mediator.Send(deliveryCommand);
                            responses.Add(localResponse);
                            break;
                        case "UploadAlertRecord":
                            var alertCommand = new CreateAlertRecordCommand { PtsRequestDto = ptsRequestDTO };
                            localResponse = await _mediator.Send(alertCommand);
                            responses.Add(localResponse);
                            break;
                        default:
                            _logger.LogError("Unknown request type: {RequestType}", packet.Type);
                            return BadRequest("Unknown request type");
                    }

                    responses.Add(localResponse);
                }
            
            if(responses.All(r=>r.Contains("OK")))
            {
               
                    Response.ContentType = "application/json; charset=utf-8";
                    Response.Headers["Connection"] = "close";
                    Response.StatusCode = 200; // OK

                    foreach (var response in responses)
                    {
                        var chunkSizeBytes = Encoding.UTF8.GetByteCount(response);
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(chunkSizeBytes.ToString("X")));
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes("\r\n"));
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(response));
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes("\r\n"));
                    }

                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes("0\r\n\r\n")); // End of chunks
                
            }
            else
            {
                Response.StatusCode = 500; // Internal Server Error
                await Response.WriteAsync("Error processing request");
            }
        

        }
        catch (JsonReaderException ex)
        {
            _logger.LogError(ex, "Invalid Json Format");
            return BadRequest("Invalid Json Format");
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
        