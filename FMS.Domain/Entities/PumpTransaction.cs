using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Pumptransaction
{
    public int Id { get; set; }

    public string PtsId { get; set; } = null!;

    public int PacketId { get; set; }

    public DateTime? DateTimeStart { get; set; }

    public DateTime DateTime { get; set; }

    public int? Pump { get; set; }

    public int? Nozzle { get; set; }

    public int? FuelGradeId { get; set; }

    public string? FuelGradeName { get; set; }

    public int? Transaction { get; set; }

    public decimal? Volume { get; set; }

    public decimal? Tcvolume { get; set; }

    public decimal? Price { get; set; }

    public decimal? Amount { get; set; }

    public decimal? TotalVolume { get; set; }

    public decimal? TotalAmount { get; set; }

    public string? Tag { get; set; }

    public int? UserId { get; set; }

    public string? ConfigurationId { get; set; }
}
