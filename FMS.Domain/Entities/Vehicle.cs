using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    public partial class Vehicle
    {
        public string HyoungNo { get; set; } = null!;

        public int VehicleId { get; set; }

        public int VehicleTypeId { get; set; }

        public int? VehicleModelId { get; set; }

        public int? VehicleManufacturerId { get; set; }

        public string? Yom { get; set; }

        public decimal ExpectedAveraged { get; set; }

        public int? DeviceId { get; set; }

        public int? DefaultEmployeeId { get; set; }

        public int? WorkingSiteId { get; set; }

        public decimal? ExcessWorkingHrCost { get; set; }

        public string? NumberPlate { get; set; }

        public string AssetId { get; set; } = null!;

        public virtual Assest Asset { get; set; } = null!;

        public virtual ICollection<Calibrationdatum> Calibrationdata { get; } = new List<Calibrationdatum>();

        public virtual Employee? DefaultEmployee { get; set; }

        public virtual Device? Device { get; set; }

        public virtual ICollection<Issuetracker> Issuetrackers { get; } = new List<Issuetracker>();

        public virtual Vehiclemanufacturer? VehicleManufacturer { get; set; }

        public virtual Vehiclemodel? VehicleModel { get; set; }

        public virtual Vehicletype VehicleType { get; set; } = null!;

        public virtual ICollection<Vehicleconsumption> Vehicleconsumptions { get; } = new List<Vehicleconsumption>();

        public virtual Site? WorkingSite { get; set; }
    }
}