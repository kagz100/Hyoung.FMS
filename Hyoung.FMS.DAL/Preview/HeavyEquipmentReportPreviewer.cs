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
using System.Linq;

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

        public void  FetchReport()
        {
            var results =  reportServicebase.FetchReport(_ihandleID);
            List<RestHeavyConsumptionModel> heavylist = new List<RestHeavyConsumptionModel>();
           
            XElement doc = XElement.Parse(results.Result.ToString());

            XmlDocument doc1 = new XmlDocument();
            doc1.LoadXml(results.Result.ToString());

            if(ReportStatus == "Done")
            {
                RestHeavyConsumptionModel heavy = new RestHeavyConsumptionModel();

               var vName= doc.Descendants("Cell").Where(x => x.Attribute("ref").Value == "i_0_0_0");

                foreach(XElement el in vName)
                {

                }

            }
            //how convert 



        }

    }
}
