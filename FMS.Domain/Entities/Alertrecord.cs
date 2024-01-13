using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Alertrecord
{
    public int AlertId { get; set; }

    public DateTime DateTime { get; set; }

    public string DeviceType { get; set; } = null!;

    public int DeviceNumber { get; set; }

    public string State { get; set; } = null!;

    public int Code { get; set; }

    public string? ConfigurationId { get; set; }

    public string Ptsid { get; set; } = null!;

    public int PacketId { get; set; }
}
