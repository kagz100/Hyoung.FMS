using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Hyoung.FMS.WebService
{
    public class ReportService : DirectoryServicesBase
    {

        private ReportingReference.Reporting _reporting = new ReportingReference.Reporting();

        

        public ReportService ()
        {
        }



        public XmlNode GetReports ()
        {
            return _reporting.GetReports(_sessionID, _applicationID);
         }

        public XmlNode GenerateReport(int reportid, DateTime startDate, DateTime endDate)
        {

            return _reporting.GenerateReport(_sessionID, reportid, startDate, endDate);
        }


        public XmlNode GetReportStatus ( int iHandleID )
        {
            return _reporting.GetReportStatus(_sessionID, iHandleID);
        }



        public XmlNode FetchReport(int IhandleID)
        {
            return _reporting.FetchReport(_sessionID, IhandleID);

         }


        public XmlNode GetProcessingReport ( int ihandleID)
        {
            return _reporting.GetProcessingReports(_sessionID, ihandleID);
        }


        public XmlNode CancelReport (int iHandleID)
        {
            return _reporting.CancelReport(_sessionID, iHandleID);
        }


    }
}
