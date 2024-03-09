using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Expectedaverageclassification
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public sbyte? IskmperLiter { get; set; }

    public virtual ICollection<Expectedaverage> Expectedaverages { get; set; } = new List<Expectedaverage>();
}
