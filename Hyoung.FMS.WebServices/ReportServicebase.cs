using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
using ReportingServiceReference1;

namespace Hyoung.FMS.WebServices
{
  public  class ReportServicebase
    {


        private ReportingServiceReference1.ReportingSoapClient reportingSoap = new ReportingServiceReference1.ReportingSoapClient(ReportingServiceReference1.ReportingSoapClient.EndpointConfiguration.ReportingSoap12);


        

        private static ReportServicebase _reportserviceBase = new ReportServicebase();

        private int _handleID;
  
        private string _sessionID;

        private int _applicationID;

        public int ApplicationID { get; set; }
        public  ReportServicebase ()
        {

            _sessionID = DirectoryServicesBase.GetSimpleService().SessionID;
            _applicationID = ApplicationID;
        }

        public async Task<System.Xml.Linq.XNode> GetReports()
        {
            var results = await reportingSoap.GetReportsAsync(_sessionID, _applicationID);

          

            return results.Body.GetReportsResult;
        }



        public async Task<int> GenerateReportAsync(int iReportID,DateTime startDate, DateTime endDate)
        {

            var results = await reportingSoap.GenerateReportAsync(DirectoryServicesBase.GetSimpleService().SessionID, iReportID, startDate, endDate);

            
            _handleID = int.Parse(results.Body.GenerateReportResult.FirstNode.ToString());
            return _handleID;

         }

        public async Task<string> GetReportStatus(int iHandle)
        {

                         var results = await reportingSoap.GetReportStatusAsync(_sessionID, iHandle);
            return results.Body.GetReportStatusResult.Value.ToString();
        }


#pragma warning disable IDE0060 // Remove unused parameter
        private void GetHandleID(System.Xml.XmlElement results)
#pragma warning restore IDE0060 // Remove unused parameter
        {
            throw new NotImplementedException();
        }

        


    }
}
