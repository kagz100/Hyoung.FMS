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

     
        

      //  private static ReportServicebase _reportserviceBase = new ReportServicebase();

        private int _handleID;
  
        private string _sessionID;

        private int _applicationID;

               public ReportServicebase() { }
        
        /// <summary>
        /// Initialize class
        /// </summary>
        /// <param name="sessionid">from directory.sessionid</param>
        /// <param name="applicationid">from directory.applicationid</param>

        public  ReportServicebase (string sessionid,int applicationid)
        {
            _sessionID = sessionid;
            _applicationID = applicationid;
        }

        /// <summary>
        /// Get a list of reports
        /// </summary>
        /// <returns></returns>
        public async Task<XmlNode> GetReports()
        {
            var results = await reportingSoap.GetReportsAsync(_sessionID, _applicationID);
                    

            return results.Body.GetReportsResult;
        }



        public async Task<int> GenerateReport(int iReportID,DateTime startDate, DateTime endDate)
        {

            var results = await reportingSoap.GenerateReportAsync(_sessionID,iReportID, startDate, endDate);

           
            _handleID = int.Parse(results.Body.GenerateReportResult.FirstChild.ToString());
            return _handleID;

         }

        public async Task<string> GetReportStatus(int iHandle)
        {

                         var results = await reportingSoap.GetReportStatusAsync(_sessionID, iHandle);
            return results.Body.GetReportStatusResult.Value.ToString();
        }


        public XmlNode GetProcessingReports()
        {
            return reportingSoap.GetProcessingReports(_sessionID, _applicationID);
        }

        public async Task<XmlNode> FetchReport (int iHandleID)
        {
            var results = await reportingSoap.FetchReportAsync(_sessionID, iHandleID);

            return results.Body.FetchReportResult;
        }

        public async Task<XmlNode> CancelReport (int iHandleID)
        {
            var results = await reportingSoap.CancelReportAsync(_sessionID, iHandleID);

            return results.Body.CancelReportResult;
        }
        


    }
}
