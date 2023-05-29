using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Devicemanufacturer
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Devicemodel> Devicemodels { get; set; } = new List<Devicemodel>();
}
