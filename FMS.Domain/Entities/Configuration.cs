using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Configuration
{
    public int Id { get; set; }

    public string? ConfigurationId { get; set; }

    public string Configuration1 { get; set; } = null!;

    public int PacketId { get; set; }

    public string Ptsid { get; set; } = null!;
}
