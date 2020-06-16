using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;
namespace Hyoung.FMS.DAL.RestModel
{
    public class VehicleUsageReportFromGPSGATE
    {

        public int vehicleID { get; set; }
       
        public int EngHrsIgnitionHrs { get; set; }

        public int TotalFuelfromFuelProbe { get; set; }
             
        public int EnginehrsFlowmeter { get; set; }
    
        public int TotalFuelFlowmeter { get; set; }

        public string GPSLastLocation { get; set; }

        public int TotalDistance { get; set; }
        public int Avgspeed { get; set; }
        public int MaxSpeed { get; set; }
        public int TotalFuelNormalFlowmeter { get; set; }
        public int TotalFuelIdleFlowmeter { get; set; }
        public int TotalEngHrsNormalFlowmeter { get; set; }
        public int TotalEnghrsIdleFlowmeter { get; set; }
        public DateTime Date { get; set; }


    }

}
