using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Heayvconsumption
    {
        public int Id { get; set; }
        public string VehicleName { get; set; }
        public string DriverName { get; set; }
        public double? RuntimeEngHrs { get; set; }
        public double? TotalFuel { get; set; }
        public double? RunTimeBurnedRateLHr { get; set; }
        public double? ExpectedFuelEff { get; set; }
        public double? FuelLost { get; set; }
        public string Site { get; set; }
        public DateTime? Date { get; set; }
        public int? FlowMeterEngHrs { get; set; }
        public int? FlowMeterTotalFuel { get; set; }
        public int? FlowMeterFuelEff { get; set; }
        public int? FlowMeterFuelLost { get; set; }
        public string Comments { get; set; }
        public int? VehicleId { get; set; }
        public int? DriverId { get; set; }
        public int? SiteId { get; set; }
        public int? MaxSpeed { get; set; }
        public int? AvgSpeed { get; set; }
    }
}
