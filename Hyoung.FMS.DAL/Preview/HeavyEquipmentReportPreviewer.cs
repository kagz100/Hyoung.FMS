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
using Microsoft.VisualBasic.CompilerServices;
using System.Xml;
using System.Xml.Linq;

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

        private  int _ihandleID;

        ReportServicebase reportServicebase;

        
        public async Task<int> GenerateReportRestAsync (int reportID,DateTime startdate,DateTime endDate)
        {


            //call for webservice to get data with 
            var results = await reportServicebase.GenerateReport(reportID, startdate, endDate);

            _ihandleID = (int)results;
            //return list of HeavyequipmentReport



            return results;

        }


        public string   ReportStatus { get; set; }

        public async Task<string> GetReportStatus()
        {


            var results = await reportServicebase.GetReportStatus(_ihandleID);


            ReportStatus = results.ToString();

            return results.ToString();
        }

        public async Task<List<RestHeavyConsumptionModel>> FetchReport()
        {
            XmlNode results = await reportServicebase.FetchReport(_ihandleID);
            List<RestHeavyConsumptionModel> heavy = new List<RestHeavyConsumptionModel>();
           
            XElement doc = XElement.Parse(results.ToString());
            if(ReportStatus == "Done")
            {
              var list = from el in doc.Descendants()
                         where el.Attribute()


            }
            //how convert 



        }

    }
}
