using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Devicemodel
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int DevicemanufacturerId { get; set; }

    public virtual Devicemanufacturer Devicemanufacturer { get; set; } = null!;
}
