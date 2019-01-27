using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Hyoung.FMS.WebServices
{
  public  class ReportServicebase
    {


        private ReportingServiceReference1.ReportingSoapClient reportingSoap = new ReportingServiceReference1.ReportingSoapClient(ReportingServiceReference1.ReportingSoapClient.EndpointConfiguration.ReportingSoap12);


        

        private static ReportServicebase _reportserviceBase = new ReportServicebase(); 


        public static ReportServicebase GetReportService ()
        {
            return _reportserviceBase;
        }



        public async Task<ReportingServiceReference1.GenerateReportResponse> GenerateReportAsync(int iReportID,DateTime startDate, DateTime endDate)
        {

            return await reportingSoap.GenerateReportAsync(DirectoryServicesBase.GetSimpleService().SessionID, iReportID, startDate, endDate);
                
         }




    }
}
