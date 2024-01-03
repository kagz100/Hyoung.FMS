using FMS.Infrastructure.Common.JsonSerialConvertors;
using FMS.Infrastructure.DependancyInjection.ATG;
//using FMS.Services.ATGServiceModels;
using FMS.Services.Models.ATGModels.Probe;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Infrastructure.Webservice.ATGService
{
    /// <summary>
    ///  Handles communication with the ATG system
    /// </summary>
    public class ATGCommunicationService : IATGCommunitcationService
    {

        private readonly HttpClient _httpClient;

        private readonly ATGServiceConfig _config;


        public ATGCommunicationService(HttpClient httpClient, ATGServiceConfig config)
        {
            _httpClient = httpClient;
            _config = config;

            //Set up the HTTPclient Authorization header for basic authentication
            var byteArray = Encoding.ASCII.GetBytes($"{_config.Username}:{_config.Password}");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));


        }

        public async Task<ProbeMeasurementsResponse> GetTankLevelAsync(int probeId)
        {
           
            
            //construct the request object and serialize it to json
            var requestModel = new ProbeGetMeasurementsRequest(probeId);

            var jsonRequest = JsonConvert.SerializeObject(requestModel);


            //send the Request to the ATG system and get the response
            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_config.BaseUrl}/getProbeMeasurements", content);

            if(response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();

                var jsonConverter = new CustomJsonConverter();

                return jsonConverter.Deserialize<ProbeMeasurementsResponse>(jsonResponse);
            }
            else
            {
                //handler errors unauthorized, bad request etc

                var errorResponse = await response.Content.ReadAsStringAsync();

                throw new HttpRequestException(($"Error fetching probe measurements: {response.StatusCode}, Content: {response.Content}"));

            }
 }

    }
}
