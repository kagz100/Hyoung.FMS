using FMS.Domain.Entities.Auth;
using FMS.Infrastructure.Webservice;
using Moq;
using NUnit.Framework;
using ReportingServiceReference;
using System;
using System.Threading.Tasks;
using System.Xml;

namespace GPSgateWebserviceTest
{

    [TestFixture]
    public class GPSGateWebserviceTests

    {
        private GPSGateDirectoryWebservice _gPSGateDirectoryWebservice;
        private GPSGateConections _gpsGateConections;

        [SetUp]
        public void Setup()
        {
            _gPSGateDirectoryWebservice = new GPSGateDirectoryWebservice();
            _gpsGateConections = new GPSGateConections( );
                    

        }

        [Test]
        public async Task TestReturnSessionID()
        {


            //arrange  
            var conn = new GPSGateConections
            {
                ApplicationID = 12,
              GPSGateUser= new GPSGateUser  {
                UserName = "kkagiri",
                Password = "Niwewe1000"
            }};

            //act 

        //    var result = await _gPSGateDirectoryWebservice.LoginAsyn(conn);

           

            //Assert.IsNull(result);
        //    Assert.IsNotEmpty(result);
          //  StringAssert.StartsWith("sessionId", result);
        }

        [Test]
        public async Task getFuelconsumption_ReturnReportdata()
        {

            //create sessionID from Postman 
            _gpsGateConections.SessionID = "FC93F2F891692CFD13FBC4CB7059FBA9";
            
            
            var reportid = 208;

            //make sure datetime is in UTC  
            var from = new DateTime(2023, 3, 27, 0, 0, 0, DateTimeKind.Local);
            var To = new DateTime(2023, 3, 28,0,0,0,DateTimeKind.Local);


            //Act 

         //   var result = await _gPSGateDirectoryWebservice.GetFuelConsumptionReport(_gpsGateConections, reportid, from, To);


            //Assert
          //  Assert.IsNotEmpty(result);
           // object value = result;

            //check if there is an error in the string result 

           // Assert.IsTrue(value.ToString().Contains("Session has expired"));

          }







    }
}