using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Tank
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal TankVolume { get; set; }

    public decimal TankHeight { get; set; }

    public virtual ICollection<Pts> Pts { get; set; } = new List<Pts>();

    public virtual ICollection<PtsTank> PtsTanks { get; set; } = new List<PtsTank>();
    public virtual ICollection<Tankmeasurement> Tankmeasurements { get; set; } = new List<Tankmeasurement>();
}
