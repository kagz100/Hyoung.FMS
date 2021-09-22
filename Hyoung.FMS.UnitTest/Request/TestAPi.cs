using Hyoung.FMS.WebServices;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Hyoung.FMS.UnitTest.Request
{
    public class TestAPI
    {
        [Category("Test")]
        [Test]
        public async Task TestAPILogin()
        {

            DirectoryServicesBase directory= new DirectoryServicesBase();

             
            var request = await directory.LoginAsync("kkagiri", "Niwewe1000", 12);

        }

       

    }
}
