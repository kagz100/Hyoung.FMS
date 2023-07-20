using FMS.Application.Models.Employee;
using FMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Models
{
    public class VehicleConsumptionInfoDTO
    {
              

          public int Id { get; set; }
            public int VehicleId { get; set; }


          
            public decimal? TotalFuel
              { get;set; }
            public string HyoungNo { get; set; }
            public String VehicleType { get; set; }
            public string VehicleModel { get; set; }
            public string VehicleManufacturer { get; set; }
             public Decimal? WorkingExpectedAverage { get; set; }
            public int WorkingEmployeesID {get;set;}
            public int WorkingSiteID { get; set; }
            public decimal? ExcessWorkingHrCost { get; set; }
           public DateTime Date { get; set; }

           public decimal? MaxSpeed { get; set; }

           public decimal? AvgSpeed { get; set; }

           public decimal TotalDistance { get; set; }

          public decimal? FuelLost { get; set; }

        public bool IsAverageKm { get; set; }

        //if the vehicle is using averagekm or l/hrs


        public decimal? FlowMeterFuelUsed { get; set; }

        public decimal? FlowMeterFuelLost { get; set; }

        public decimal? FlowMeterEffiency { get;set; }
        public decimal? FuelEfficiency { get; set; }
        public decimal? EngHours { get; set; }

        public decimal? FlowMeterEngineHrs { get; set; }

        public bool IsNightShift { get; set; }

        public string Comments { get; set; }

        public bool IsModified { get; set; }
    }
}
