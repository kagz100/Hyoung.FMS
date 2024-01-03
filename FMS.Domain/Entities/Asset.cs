using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Asset
{
    public string AssetId { get; set; } = null!;

    public int? VehicleModelId { get; set; }

    public int? VehicleManufacturerId { get; set; }

    public int? VehicleTypeId { get; set; }

    public string? SiteId { get; set; }

    public virtual Vehiclemanufacturer? VehicleManufacturer { get; set; }

    public virtual Vehiclemodel? VehicleModel { get; set; }

    public virtual Vehicletype? VehicleType { get; set; }
}
