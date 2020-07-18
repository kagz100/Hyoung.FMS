using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using FMS.Persistence.GPSGateWebService.Interface;

namespace Hyoung.test
{
    [TestFixture]
   public class DirectoryTest
    {
        

     

        [Test]
        public void LogintoFail()
        {
            var context = new Mock<IDirectoryWebservice>(MockBehavior.Strict);
        }

    }
}
