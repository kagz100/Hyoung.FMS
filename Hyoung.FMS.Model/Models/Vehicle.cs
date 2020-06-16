using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Vehicle
    {
        public Vehicle()
        {
            Heayvconsumption = new HashSet<Heavyconsumption>();
            Lightvehicleconsumption = new HashSet<Lightvehicleconsumption>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string HyoungNo { get; set; }
        public string Fuel { get; set; }
        public int? Vehicletypeid { get; set; }
        public string Fuel2 { get; set; }
        public string Model { get; set; }
        public double? PhoneNumber { get; set; }
        public string DeviceType { get; set; }
        public int? ExpectdFuelComs { get; set; }
        public int? ExpectFuelConsumptionHr { get; set; }
        public int? TankCapacity { get; set; }
        public int? FuelSensorSerialNo { get; set; }
        public DateTime? InstalledDate { get; set; }
        public int? SecurityTag { get; set; }
        public double? Imei { get; set; }
        public string FlowMeterCalibrtaion { get; set; }
        public int? FlowMeterSerialNumber { get; set; }
        public int? FlowMeterInstalledDate { get; set; }
        public int? AssignedDriverId { get; set; }

        public virtual Vehicletype Vehicletype { get; set; }
        public virtual ICollection<Heavyconsumption> Heayvconsumption { get; set; }
        public virtual ICollection<Lightvehicleconsumption> Lightvehicleconsumption { get; set; }
    }
}
