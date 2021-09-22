using FMS.Persistence.GPSGateWebService.Interface;
using FMS.Persistence.GPSGateWebService.Service;
using Rhino.Mocks;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Hyoung.test.WCFTest
{
   public class DirectoryServices
    {


        public DirectoryServices(GPSGateDirectoryWebservice context)
        {

        }

        [Fact]
        public void testloginFail()
        {
            IDirectoryWebservice mock = MockRepository.GenerateMock<IDirectoryWebservice>();

            mock.Expect(t => t.LoginAsync("", "", 12)).Return("");

        }


    }
}
