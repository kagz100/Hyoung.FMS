using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using ReportingServiceReference1;

namespace Hyoung.FMS.WebServices
{
  public  class ReportServicebase
    {


        private ReportingServiceReference1.ReportingSoapClient reportingSoap = new ReportingServiceReference1.ReportingSoapClient(ReportingServiceReference1.ReportingSoapClient.EndpointConfiguration.ReportingSoap12);


        

        private static ReportServicebase _reportserviceBase = new ReportServicebase();

        private int _handleID;
  
        private string _sessionID;

        public  ReportServicebase ()
        {

            _sessionID = DirectoryServicesBase.GetSimpleService().SessionID;
        }



        public async Task<int> GenerateReportAsync(int iReportID,DateTime startDate, DateTime endDate)
        {

            var results = await reportingSoap.GenerateReportAsync(DirectoryServicesBase.GetSimpleService().SessionID, iReportID, startDate, endDate);


            _handleID = int.Parse(results.Body.GenerateReportResult.FirstNode.ToString());
            return _handleID;

         }

        private void GetHandleID(System.Xml.XmlElement results)
        {
            throw new NotImplementedException();
        }

        


    }
}
