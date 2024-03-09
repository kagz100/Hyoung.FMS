using FMS.Application.Models.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.ModelsDTOs.Consumption
{
    public class HistoryConsumptionDTO
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }

        public decimal? TotalFuel
        { get; set; }
     
        public decimal ExpectedAveraged { get; set; }
        public string Employee { get; set; }
        public string Site { get; set; }
        public decimal? ExcessWorkingHrCost { get; set; }
        public DateTime Date { get; set; }

        public decimal? MaxSpeed { get; set; }

        public decimal? AvgSpeed { get; set; }

        public decimal TotalDistance { get; set; }

        public decimal? FuelLost { get; set; }

        public bool IsAverageKm { get; set; }

        public decimal? FlowMeterFuelUsed { get; set; }

        public decimal? FlowMeterFuelLost { get; set; }

        public decimal? FlowMeterEffiency { get; set; }
        public decimal? FuelEfficiency { get; set; }
        public decimal? EngHours { get; set; } = 0;

        public decimal? FlowMeterEngineHrs { get; set; }

        public bool IsNightShift { get; set; }

        public string Comments { get; set; }

        public bool IsModified { get; set; }


    }
}
