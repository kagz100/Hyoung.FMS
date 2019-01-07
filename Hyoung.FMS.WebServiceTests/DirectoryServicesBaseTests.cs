using Microsoft.VisualStudio.TestTools.UnitTesting;
using Hyoung.FMS.WebService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hyoung.FMS.WebService.Tests
{
    [TestClass()]
    public class DirectoryServicesBaseTests
    {
        [TestMethod()]
        public void checkErrorTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void Login_WhenUserEnterWrongPassword_returnTrue()
        {
            //arrange
            string _username = "kkagiri";
            string _Password = "Niwewe100";

            int _ApplicationID = 12;


            //DirectoryServicesBase  = new DirectoryServicesBase();
            DirectoryServicesBase director = DirectoryServicesBase.GetSimpleService();


            //act
           
              var result =director.Login(_username, _Password, _ApplicationID);



            //asesrt

            StringAssert.Contains("Invalid", result.ToString());
        }
    }
}