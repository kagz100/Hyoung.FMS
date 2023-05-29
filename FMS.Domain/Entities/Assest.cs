using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Assest
{
    public DateTime? Purchaseon { get; set; }

    public string AssestId { get; set; } = null!;

    public string? HyoungNo { get; set; }

    public sbyte IsInstalled { get; set; }

    public int? VehicleType { get; set; }

    public int? Vehiclemodel { get; set; }

    public int? VehicleManufacturer { get; set; }

    public virtual Vehiclemanufacturer? VehicleManufacturerNavigation { get; set; }

    public virtual Vehicletype? VehicleTypeNavigation { get; set; }

    public virtual Vehiclemodel? VehiclemodelNavigation { get; set; }
}
