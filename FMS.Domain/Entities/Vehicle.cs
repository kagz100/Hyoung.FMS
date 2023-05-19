using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

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

    public bool AverageKmL { get; set; }

    public string? Capacity { get; set; }

    public string? CurrentPhysicalReading { get; set; }

    public virtual ICollection<Calibrationdatum> Calibrationdata { get; set; } = new List<Calibrationdatum>();

    public virtual Employee? DefaultEmployee { get; set; }

    public virtual Device? Device { get; set; }

    public virtual ICollection<Issuetracker> Issuetrackers { get; set; } = new List<Issuetracker>();

    public virtual Vehiclemanufacturer? VehicleManufacturer { get; set; }

    public virtual Vehiclemodel? VehicleModel { get; set; }

    public virtual Vehicletype VehicleType { get; set; } = null!;

    public virtual ICollection<Vehicleconsumption> Vehicleconsumptions { get; set; } = new List<Vehicleconsumption>();

    public virtual Site? WorkingSite { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
