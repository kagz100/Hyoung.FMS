using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FMS.Domain.Entities;

public partial class Tankmeasurement
{
    public int Id { get; set; }

    public DateTime DateTime { get; set; }

    public int FuelGradeId { get; set; }

    public string Ptsid { get; set; } = null!;

    public double? ProductHeight { get; set; }

    public double? WaterHeight { get; set; }

    public double? Temperature { get; set; }

    public double? ProductVolume { get; set; }

    public double? WaterVolume { get; set; }

    public double? ProductTcvolume { get; set; }

    public double? ProductDensity { get; set; }

    public double? ProductMass { get; set; }

    public int? TankFillingPercentage { get; set; }

    public string? ConfigurationId { get; set; }

    public int PacketId { get; set; }

    public double? ProductUllage { get; set; }

    public string? Status { get; set; }

    public int Tank { get; set; }

    public virtual ICollection<Alarm> Alarms { get; set; } = new List<Alarm>();


}
