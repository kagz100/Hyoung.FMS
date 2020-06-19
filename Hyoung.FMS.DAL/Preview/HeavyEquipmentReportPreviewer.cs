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
using System.Data;
using System.Threading;

namespace Hyoung.FMS.DAL.Preview
{
    public class HeavyEquipmentReportPreviewer
    {


        public HeavyEquipmentReportPreviewer (string sessionid,int applicationid)
        {
            _sessionID = sessionid;
            _applicationID = applicationid;
            reportServicebase = new ReportServicebase();
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

        public async Task<List<VehicleUsageReportFromGPSGATE>>  FetchReport()
        {
            List<VehicleUsageReportFromGPSGATE> vehicleList = new List<VehicleUsageReportFromGPSGATE>();
            var results = await reportServicebase.FetchReport(_ihandleID);

            List<VehicleUsageReportFromGPSGATE> vehicleReportlist = new List<VehicleUsageReportFromGPSGATE>();
            XElement doc = XElement.Parse(results.ToString());
            XNamespace ad = "http://gpsgate.com/xml/";

            //get error 
           
            if(doc.Descendants("error").Count()>1)
            {

                var result = doc.Descendants("message").Select(x => x.Value).FirstOrDefault();
                
                throw new Exception(result);
            }
               try
                    {
                        IEnumerable<VehicleUsageReportFromGPSGATE> querys = from i in doc.Descendants(ad + "Row")
                                                                            select new VehicleUsageReportFromGPSGATE
                                                                            {
                                                                                vehicleID = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_0").FirstOrDefault(),
                                                                                EngHrsIgnitionHrs = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_1").FirstOrDefault(),
                                                                                TotalFuelfromFuelProbe = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_2").FirstOrDefault(),
                                                                                EnginehrsFlowmeter = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_3").FirstOrDefault(),
                                                                                TotalFuelFlowmeter = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_4").FirstOrDefault(),
                                                                                GPSLastLocation = (string)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_5").FirstOrDefault(),
                                                                                TotalDistance = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_6").FirstOrDefault(),
                                                                                Avgspeed = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_7").FirstOrDefault(),
                                                                                MaxSpeed = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_8").FirstOrDefault(),
                                                                                TotalFuelNormalFlowmeter = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_9").FirstOrDefault(),
                                                                                TotalFuelIdleFlowmeter = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_10").FirstOrDefault(),
                                                                                TotalEngHrsNormalFlowmeter = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_11").FirstOrDefault(),
                                                                                TotalEnghrsIdleFlowmeter = (int)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_12").FirstOrDefault(),
                                                                                Date = (DateTime)i.Descendants(ad + "Cell").Where(x => x.Attribute("ref").Value == "i_0_0_13").FirstOrDefault(),
                                                                            };


                      vehicleList= querys.ToList();
                return vehicleList;

                    }
                    catch (Exception e)
                    {

                    throw new Exception(e.Message);

                    }                
           
        }

    }
}
