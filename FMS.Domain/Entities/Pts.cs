using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Pts
{
    public int Id { get; set; }

    public string PtsserialNo { get; set; } = null!;

    public int SiteId { get; set; }
    public virtual Site Site { get; set; } = null!;
    public virtual ICollection<Tank> Tanks { get; set; } = new List<Tank>();
}
