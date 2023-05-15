using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Vehiclemodel
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? ManufacturerId { get; set; }

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
