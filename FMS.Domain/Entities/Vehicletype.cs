using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

/// <summary>
/// 			
/// </summary>
public partial class Vehicletype
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Abbvr { get; set; }

    public string? Nothinghere { get; set; }

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
