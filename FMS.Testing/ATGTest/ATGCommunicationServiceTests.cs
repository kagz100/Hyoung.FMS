using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Xunit;
using FMS.Infrastructure.Webservice.ATGService;
using FMS.Services.Models.ATGModels.Probe;
using System.Net;
using FMS.Services.Models.ATGModels;
using Newtonsoft.Json;
using Moq.Protected;
using MySqlX.XDevAPI.Common;

namespace FMS.Testing.ATGTest
{

    public class ATGCommunicationServiceTests
    {

        [Fact]
        public async Task GetProbeMeasurementAsync_ReturnsValidResponse()
        {

            //Arrange
            var MockHttpMessageHandler = new Mock<HttpMessageHandler>();
            var probeId = 1;
            var sampleResponnse = new ProbeMeasurementsResponse
            {
                Protocol = "jsonPTS",
                Packets = new List<MeasurementPacket>
                {
                    new MeasurementPacket
                    {
                        Id=1,
                        Type="ProbeMeasurements",
                       Data = new MeasurementData
                        {
                             Probe = probeId,
                             Status = "OK",
                              ProductHeight = 2534.1,
                              WaterHeight = 123.1,
                              Temperature = 21.3,
                    LastInTankDeliveryStart = new Delivery
                           {
                    DateTime = DateTime.Parse( "2019-03-09T15:30:25"),
                    ProductHeight = 2534.1f,
                    WaterHeight = 123.1f,
                    Temperature = 21.3f,
                    ProductVolume = 2005f,
                    ProductTCVolume = 2015f
                },
                LastInTankDeliveryEnd = new Delivery
                {
                    DateTime =DateTime.Parse("2019-03-09T15:32:15"),
                    ProductHeight = 2725.1f,
                    WaterHeight = 130.4f,
                    Temperature = 21.6f,
                    ProductVolume = 2514,
                    ProductTCVolume = 2601
                },
                LastInTankDelivery = new Delivery
                {
                    ProductDensity = 758.9f,
                    ProductMass = 386.3f,
                    PumpsDispensedVolume = 25.3f
                },
                Alarms = new Alarm(new List<string> { "CriticalHighProduct", "HighWater" })
            }

                        }

                    }

            };

            var serializedResponse = JsonConvert.SerializeObject(sampleResponnse);


            MockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.Is<HttpRequestMessage>(req=>req.Method == HttpMethod.Post),
                ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(serializedResponse)
                });

            var httpclient = new HttpClient(MockHttpMessageHandler.Object);

            var config = new ATGServiceConfig
            {
                BaseUrl = "https://10.0.14.21",               
                Password = "admin",
                Username = "admin"
            };

            var service = new ATGCommunicationService(httpclient, config);


            //Act
            var result = await service.GetTankLevelAsync(probeId);

            //Assert
            Assert.NotNull(result);
            Assert.Equal("jsonPTS", result.Protocol);
            Assert.Single(result.Packets);
            Assert.Equal(probeId, result.Packets[0].Data.Probe);
            Assert.Equal("OK", result.Packets[0].Data.Status);


        }


    }
}
