using FMS.Domain.Entities;
using FMS.Domain.Entities.Auth;
using FMS.Infrastructure.DependancyInjection;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace FMS.Infrastructure.Webservice
{
     public class GPSGateDirectoryWebservice :IGPSGateDirectoryWebservice
    {
        private readonly DirectoryServiceReference1.DirectorySoapClient _DirectorySoapClient;
        private readonly ReportingServiceReference.ReportingSoapClient _ReportSoapClient;

        

        public GPSGateDirectoryWebservice()
        {
            _DirectorySoapClient = new DirectoryServiceReference1.DirectorySoapClient(DirectoryServiceReference1.DirectorySoapClient.EndpointConfiguration.DirectorySoap12);
            _ReportSoapClient = new ReportingServiceReference.ReportingSoapClient(ReportingServiceReference.ReportingSoapClient.EndpointConfiguration.ReportingSoap12);
        }





        

        /// <summary>
        /// Get Feul consumption report from GPSGate
        /// </summary>
        /// <param name="conn">GpsConnection SessionId </param>
        /// <param name="FuelConsumptionReportID">FuelConsumption ID </param>
        /// <param name="from">Start Date </param>
        /// <param name="to">End Date  </param>
        /// <returns></returns>
        public async Task<List<Vehicleconsumption>> GetFuelConsumptionReportAsync(GPSGateConections conn, int FuelConsumptionReportID, DateTime from, DateTime to)
        {
         string fromdatestr = from.ToString("o",CultureInfo.InvariantCulture) ;
          string todatestr = to.ToString("o",CultureInfo.InvariantCulture);
               

            var results = await _ReportSoapClient.GenerateReportAsync(conn.SessionID,FuelConsumptionReportID, DateTime.Parse(fromdatestr),DateTime.Parse(todatestr));

            try
            {
                CheckError(results.Body.GenerateReportResult);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            // Parse the report data into an XDocument object
            var reportXml = XDocument.Load(new StringReader(results.Body.GenerateReportResult.OuterXml));

            // Retrieve the handleid and state data
            var handleId = reportXml.Descendants("handleid").FirstOrDefault()?.Value;
            var state = reportXml.Descendants("state").FirstOrDefault()?.Value;

            // Change handleid to int
            int.TryParse(handleId, out int handleIdInt);

            // Check if report is ready
            while(state == "Processing")
            {
                // If not ready, wait 1 second and check again
                await Task.Delay(1000);
                await GetReportStatus(conn, handleIdInt);

                var reportstatus = await _ReportSoapClient.GetReportStatusAsync(conn.SessionID, handleIdInt);

                state = reportstatus.Body.GetReportStatusResult.ToString();
            }
            
            
                // If ready, get the report
                var report = await _ReportSoapClient.FetchReportAsync(conn.SessionID, handleIdInt);

                // Parse the report data into an XDocument object
                var reportXmls = XDocument.Load(new StringReader(report.Body.FetchReportResult.OuterXml));

            //remove namespace from xml 

            reportXmls.Descendants().Attributes().Where(a => a.IsNamespaceDeclaration).Remove();

               //debug
               //extract all descedants
               
            //  foreach(var element in reportXmls.Descendants())
            //{
            //    Console.WriteLine(element.Name + " - " + element.Value + " Attributes- " + element.Attributes().ToString());
            //}
            
                    

            var headerRow = reportXmls.Descendants("{http://gpsgate.com/xml/}Row").FirstOrDefault(r => r.Attribute("kind")?.Value == "h");
                var dataRows = reportXmls.Descendants("{http://gpsgate.com/xml/}Row").Where(r => r.Attribute("kind")?.Value == "i").ToList();


                if (headerRow == null || !dataRows.Any())
                {
                    throw new ArgumentException("Invalid report format");
                }

                var headcell = headerRow.Descendants("{http://gpsgate.com/xml/}Cell").ToList();

                var result = new List<Vehicleconsumption>();


                foreach (var dataRow in dataRows)
                {
                          

                    var consumption = ParseVehicleConsumption(dataRow);

                    result.Add(consumption);
                }


                return result;
            

        }

        public Vehicleconsumption ParseVehicleConsumption(XElement dataRow)
        {

            var consumption = new Vehicleconsumption();

            foreach(var datacell in dataRow.Descendants("{http://gpsgate.com/xml/}Cell"))
            {
                var refValue = datacell.Attribute("ref")?.Value;

                if(refValue == null)
                {
                    throw new ArgumentException("Wrong report format");
                }

                //reportformat 
                  //< Cell ref= "i_0_0_0" > vehicleID </ Cell >
                  //  < Cell ref= "i_0_0_1" > EngHrsIgnitionHrs </ Cell >
                  //  < Cell ref= "i_0_0_2" > TotalFuelfromFuelProbe </ Cell >
                  //  < Cell ref= "i_0_0_3" > EnginehrsFlowmeter </ Cell >
                  //  < Cell ref= "i_0_0_4" > TotalFuelFlowmeter </ Cell >
                  //  < Cell ref= "i_0_0_5" > GPSLastLocation </ Cell >
                  //  < Cell ref= "i_0_0_6" > TotalDistance </ Cell >
                  //  < Cell ref= "i_0_0_7" > Avgspeed </ Cell >
                  //  < Cell ref= "i_0_0_8" > MaxSpeed </ Cell >
                  //  < Cell ref= "i_0_0_9" > TotalFuelNormalFlowmeter </ Cell >
                  //  < Cell ref= "i_0_0_10" > TotalFuelIdleFlowmeter </ Cell >
                  //  < Cell ref= "i_0_0_11" > TotalEngHrsNormalFlowmeter </ Cell >
                  //  < Cell ref= "i_0_0_12" > TotalEnghrsIdleFlowmeter </ Cell >
                  //  < Cell ref= "i_0_0_13" > Date </ Cell >
                //get property 

                switch (refValue)
                {
                    case "i_0_0_0":
                        consumption.VehicleId = int.Parse(datacell.Value);
                        break;
                    case "i_0_0_1":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.EngHours = decimal.Parse(datacell.Value, CultureInfo.InvariantCulture);
                        }
                        break;
                    case "i_0_0_2":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.TotalFuel = decimal.Parse(datacell.Value, CultureInfo.InvariantCulture);
                        }
                        break;
                    case "i_0_0_3":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.FlowMeterEngineHrs = decimal.Parse(datacell.Value, CultureInfo.InvariantCulture);
                        }
                        break;
                    case "i_0_0_4":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.FlowMeterFuelUsed = decimal.Parse(datacell.Value, CultureInfo.InvariantCulture);
                        }
                        break;
                    case "i_0_0_5":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.Site.Name = datacell.Value;
                        }
                        break;
                    case "i_0_0_6":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.TotalDistance = decimal.Parse(datacell.Value,NumberStyles.Float, CultureInfo.InvariantCulture);
                        }
                        break;

                    case "i_0_0_7":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.AvgSpeed = decimal.Parse(datacell.Value, CultureInfo.InvariantCulture);
                        }
                        break;
                    case "i_0_0_8":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.MaxSpeed = decimal.Parse(datacell.Value, CultureInfo.InvariantCulture);
                        }
                        break;
                    case "i_0_0_13":
                        if (!string.IsNullOrEmpty(datacell.Value))
                        {
                            consumption.Date = DateTime.Parse(datacell.Value);
                        }
                        break;
                    default:
                        // Ignore unknown properties
                        break;


                }
            }

            return consumption;

        }



        /// <summary>
        /// Parse the report data from GPSGate into an XDocument vehicleConsumption object
        /// </summary>
        /// <param name="headerCells"></param>
        /// <param name="datacells"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task<string> LoginAsyn(GPSGateConections conn)
        {
            var results = await _DirectorySoapClient.LoginAsync(conn.GPSGateUser.UserName, conn.GPSGateUser.Password, conn.ApplicationID);

            try
            {
                CheckError(results);
            }
            catch (Exception e)
            {
                return e.Message;
            }

            var xmlDoc = new XmlDocument();

            xmlDoc.LoadXml(results.OuterXml);

            var sessionIDNode = xmlDoc.SelectSingleNode("//sessionId");



            return results.InnerText;
        }



        /// <summary>
        /// Check on the Progress of the Report 
        /// </summary>
        /// <param name="conn">GPSGATE Connnection</param>
        /// <param name="handleIdInt">HandleID</param>
        /// <returns></returns>
        private async Task<string> GetReportStatus(GPSGateConections conn, int handleId)
        {
            //check on GPSGATE API 

            var reportStatus = await _ReportSoapClient.GetReportStatusAsync(conn.SessionID, handleId);

            // Deserialize the report data into a ReportHandler object

            var serializer = new XmlSerializer(typeof(ReportHandler));
            //retrieve the handleid and state data

            var reportHandler = (ReportHandler)serializer.Deserialize(new XmlTextReader(reportStatus.Body.GetReportStatusResult.ToString()));

            //retrieve the handleid and state data

            var state = reportHandler.State;
            var handleID = reportHandler.HandleId;

            //return the status 

            return state;
           
        }

        public void CheckError(XmlNode element)
        {
            if (element != null && element.FirstChild != null && element.FirstChild.Name == "exception")
            {
                throw new Exception(element.SelectSingleNode("//exception/message").InnerText);
            }



            
        }








    }


  
    public class ReportHandler
    {
        [XmlElement(ElementName = "handleid")]
        public int  HandleId { get; set; }

        [XmlElement(ElementName = "state")]
        public string State { get; set; }

        public static implicit operator XmlDocument(ReportHandler v)
        {
            throw new NotImplementedException();
        }
    }




}
