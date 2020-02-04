using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Lightvehicleconsumption
    {
        public int Id { get; set; }
        public string VehicleName { get; set; }
        public string Driver { get; set; }
        public double? TotalDistanceGps { get; set; }
        public double? MaxSpeed { get; set; }
        public double? AverageSpeed { get; set; }
        public double? ExpectedFuelAvgKmL { get; set; }
        public double? FuelEfficiency { get; set; }
        public double? TotalFuel { get; set; }
        public double? FuelLost { get; set; }
        public DateTime? Date { get; set; }
        public int? Site { get; set; }
        public int? FlowMeterTotalFuel { get; set; }
        public int? FlowMeterFuelEff { get; set; }
        public int? FowMeterFuelLost { get; set; }
        public string Comments { get; set; }
        public int? DriverId { get; set; }
        public int? VehicleId { get; set; }
        public int? SiteId { get; set; }

        public virtual Drivers DriverNavigation { get; set; }
        public virtual Site SiteNavigation { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}
