using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Expectedaverage
{
    public int Id { get; set; }

    public int VehicleId { get; set; }

    public int ExpectedAverageClassificationId { get; set; }

    public decimal ExpectedAverage1 { get; set; }

    public int SiteId { get; set; }

    public virtual Expectedaverageclassification ExpectedAverageClassification { get; set; } = null!;

    public virtual Site Site { get; set; } = null!;

    public virtual Vehicle Vehicle { get; set; } = null!;

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
