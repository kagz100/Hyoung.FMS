using AutoMapper;
using FMS.Application.Queries.GPSGATEServer.GetconsumptionReport;
using FMS.Application.Queries.GPSGATEServer.LoginQuery;
using FMS.Domain.Entities;
using FMS.Domain.Entities.Auth;
using FMS.Infrastructure.DependancyInjection;
using FMS.Persistence.DataAccess;
using Moq;
using NuGet.Frameworks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace FMS.Testing
{
    public class GetConsumptionReportTest
    {

        private readonly Mock<IGPSGateDirectoryWebservice> _gpsGateDirectoryWebservice;
        private readonly Mock<GpsdataContext> _gpsdataContext;
        private readonly Mock<IMapper> _mapper;

        GPSGateConections conns;

        public GetConsumptionReportTest()
        {
            _gpsGateDirectoryWebservice = new Mock<IGPSGateDirectoryWebservice>();
            _gpsdataContext = new Mock<GpsdataContext>();
            _mapper = new Mock<IMapper>();
        }

        private  async void LoginAsync ()
        {
            var username = "kkagiri";
            var password  = "password";
            int ApplicationID = 12;

            var loginQuery = new LoginQuery
            {
                GPSGateConections = new GPSGateConections
                {
                    GPSGateUser = new GPSGateUser
                    {
                        UserName = username,
                        Password = password
                    },
                    ApplicationID = ApplicationID
                }
            };

            var loginQueryHandler = new LoqinQuery(_gpsGateDirectoryWebservice.Object);

            conns =  await loginQueryHandler.Handle(loginQuery, CancellationToken());

        }

        private CancellationToken CancellationToken()
        {
            throw new NotImplementedException();
        }

        [Fact]
        private async Task TestHandle()
        {
            //arrange 
              var from = "2023-07-01";
             var to = "2023-07-01";

               LoginAsync();

            var handler = new GetConsumptionReportQueryHandler(_gpsGateDirectoryWebservice.Object, _gpsdataContext.Object, _mapper.Object);
            var consumptionBatch = new List<Vehicleconsumption> {
            
            
            };
            var request = new GetConsumptionReportQuery (conns,208,DateTime.Parse(from),DateTime.Parse(to));


            //act
            await handler.Handle(request, CancellationToken());

            //assert

            _gpsdataContext.Verify(x=>x.SaveChanges(CancellationToken,))



        }



    }
}
