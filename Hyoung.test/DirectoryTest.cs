using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using FMS.Persistence.GPSGateWebService.Interface;
using FMS.WebClient.Models.Settings;
using FMS.Persistence.GPSGateWebService.Service;
using FMS.Domain.Entities.Settings;
using FMS.Domain.Entities.Auth;
using System.Threading.Tasks;
using Unity;

namespace Hyoung.test
{
    [TestFixture]
   public class DirectoryTest
    {


        private  readonly IDirectoryWebservice directoryWebservice;
        private GPSGateConections Gpgsconnection { get; set; }
        private GPSGateUser gpsUser { get; set; }
   




        [Test]
        public  void LogintoFail()
        {

            GPSGateUser user = new GPSGateUser();
            //arrange 
            user.Password = "1";
            var errormessage = "Wrong username or password";
            Gpgsconnection.GPSGateUser.UserName = "kkagiri";
            Gpgsconnection.GPSGateUser.Password = "1";

            Gpgsconnection.ApplicationID = 12;

            var MockRepo =new Mock<IDirectoryWebservice>();

            MockRepo.Setup(m => m.LoginAsyn(Gpgsconnection)).Returns(Task.FromResult<string>(errormessage));


            IDirectoryWebservice wcfMockobject = MockRepo.Object;


            UnityHelper.IoC = new UnityContainer();

            UnityHelper.IoC.RegisterInstance<IDirectoryWebservice>(wcfMockobject);


            GPSGateDirectoryWebservice serviceAgent = new GPSGateDirectoryWebservice(Gpgsconnection);


            var actualvalue =  serviceAgent.LoginAsyn(Gpgsconnection);
          
          //  var results = await    directoryWebservice.LoginAsyn(Gpgsconnection);
            //Act
            Assert.AreEqual(errormessage , actualvalue);
        }

    }


    public static class UnityHelper
    {
        public static UnityContainer IoC;
    }
}
