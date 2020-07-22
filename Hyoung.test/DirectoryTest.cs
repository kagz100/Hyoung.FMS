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

namespace Hyoung.test
{
    [TestFixture]
   public class DirectoryTest
    {


        private  IDirectoryWebservice directoryWebservice;
        private GPSGateConections Gpgsconnection { get; set; }
        private GPSGateUser gpsUser { get; set; }
        protected DirectoryTest ()
        {
            directoryWebservice = new GPSGateDirectoryWebservice(IGPSGateConnection);
           
        }

        [Test]
        public async void LogintoFail()
        {
            //arrange 
            var errormessage = "Wrong username or password";
            gpsUser.UserName

            //Act
            var results = await    directoryWebservice.LoginAsyn(gpsUser);
        }

    }
}
