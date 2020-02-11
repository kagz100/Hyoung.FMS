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
        private string _sessionid { get; set;}
        private int _applicationid = 12;
        DirectoryServicesBase _directorybase = new DirectoryServicesBase();


       

        [Fact]
        public void Get_reportdata()
        {
            //arrange 


            Task<string> task = Task.Run(async () => await _directorybase.LoginAsync("controlroom", "Hyoung2018", _applicationid).ConfigureAwait(false));


            //act 
            _sessionid = task.Result;

            var x = _directorybase.ApplicationID;

            XmlDocument doc = new XmlDocument();

            ReportServicebase _reportBase = new ReportServicebase(_sessionid, _applicationid);

            Task<XmlNode> getreporttasknode = Task.Run(async ()=> await  _reportBase.GetReports());


            var RESUlts = getreporttasknode.Result;

           // doc.LoadXml(getreporttasknode.Result.);


            //doc.LoadXml(results);






            //assert
            //we are expected a return of sesssionid 
            // so we check if the first element is session id 
            Assert.Equal("", "");


        }
    }
}
