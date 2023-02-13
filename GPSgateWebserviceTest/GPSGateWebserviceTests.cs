using FMS.Domain.Entities.Auth;
using FMS.Infrastructure.Webservice;
using NUnit.Framework;
using System.Threading.Tasks;
using System.Xml;

namespace GPSgateWebserviceTest
{

    [TestFixture]
    public class GPSGateWebserviceTests

    {
        private GPSGateDirectoryWebservice _gPSGateDirectoryWebservice;


        [SetUp]
        public void Setup()
        {
            _gPSGateDirectoryWebservice = new GPSGateDirectoryWebservice();

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

            var result = await _gPSGateDirectoryWebservice.LoginAsyn(conn);

           

            //Assert.IsNull(result);
            Assert.IsNotEmpty(result);
            StringAssert.StartsWith("sessionId", result);
        }
    }
}