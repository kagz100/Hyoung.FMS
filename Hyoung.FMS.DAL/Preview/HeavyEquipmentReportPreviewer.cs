using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hyoung.FMS.DAL.RestModel;
using Hyoung.FMS.WebServices;
using Hyoung.FMS.Model.Models;
using Hyoung.FMS.DAL.Repositories.Reports;
using MySqlX.XDevAPI.Common;
using System.Drawing.Printing;
using System.Globalization;

namespace Hyoung.FMS.DAL.Preview
{
    public class HeavyEquipmentReportPreviewer
    {


        public HeavyEquipmentReportPreviewer (string sessionid,int applicationid)
        {
            _sessionID = sessionid;
            _applicationID = applicationid;
        }

        private string _sessionID;
        private int _applicationID;

        private readonly int _ihandleID;

        ReportServicebase reportServicebase;

        
        public async Task<int> GenerateReportRestAsync (int reportID,DateTime startdate,DateTime endDate)
        {


            //call for webservice to get data with 
            var results = await reportServicebase.GenerateReport(reportID, startdate, endDate);


            //return list of HeavyequipmentReport



            return results;

        }


        public async Task<string> GetReportStatus()
        {


            var results = await reportServicebase.GetReportStatus(_ihandleID);


            return results.ToString();
        }

        public async Task<List<RestHeavyConsumptionModel>> FetchReport()
        {
            var results = await reportServicebase.FetchReport(_ihandleID);

            //how convert 



        }

    }
}
