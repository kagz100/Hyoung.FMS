using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Vehiclemanufacturer
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
