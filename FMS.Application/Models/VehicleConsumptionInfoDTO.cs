using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Models
{
    public class VehicleConsumptionInfo
    {
              
            public int VehicleId { get; set; }
            public decimal? TotalFuel { get; set; }
            public string HyoungNo { get; set; }
            public String VehicleType { get; set; }
            public string VehicleModel { get; set; }
            public string VehicleManufacturer { get; set; }
            public decimal ExpectedAveraged { get; set; }
            public string DefaultEmployee { get; set; }
            public string Site { get; set; }
            public decimal? ExcessWorkingHrCost { get; set; }

           public string EmployeeWorkNumber { get; set; }

           public DateTime Date { get; set; }

           public decimal? MaxSpeed { get; set; }

           public decimal? AvgSpeed { get; set; }

           public decimal? TotalDistance { get; set; }

          public decimal? FuelLost { get; set; }

        public decimal? FlowMeterFuelUsed { get; set; }

        public decimal? FlowMeterFuelLost { get; set; }

        public decimal? FlowMeterEffiency { get; set; }

        public decimal? FuelEfficiency { get; set; }

        public decimal? EngHours { get; set; }

        public decimal? FlowMeterEngineHrs { get; set; }

        public sbyte IsNightShift { get; set; }
    }
}
