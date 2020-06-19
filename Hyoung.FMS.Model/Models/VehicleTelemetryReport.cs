using System;
using System.Collections.Generic;
using System.Text;

namespace Hyoung.FMS.Model.Models
{
    public class VehicleTelemetryReport:Entity

    {
        public virtual Vehicle Vehicle { get; set; }

        public int ExpectedFuelEffKmperliter { get; set; }

        public int ExpectedFuelEffLiters { get; set; }

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
