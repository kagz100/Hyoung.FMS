using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Hyoung.FMS.WebServices;
using System.Threading.Tasks;
using System.Xml;

namespace DAL.test
{
  public  class HeavyConsumptionReport
    {
        [Fact]
        public void get_reportdata()
        {
            //arrange 

            DirectoryServicesBase _directorybase = new DirectoryServicesBase();


            ReportServicebase _reportBase = new ReportServicebase();

            //act 
          Task<string> task  = Task.Run(async ()=>await   _directorybase.LoginAsync("controlroom", "Hyoung2018", 12));
            string results = task.Result;


            XmlDocument doc = new XmlDocument();

            doc.LoadXml(results);






            //assert
            //we are expected a return of sesssionid 
            // so we check if the first element is session id 
            Assert.Equal("", "");


        }
    }
}
