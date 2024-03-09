using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Tank
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal TankVolume { get; set; }

    public decimal TankHeight { get; set; }

    public int PtsId { get; set; }

    //Todo: Check if this is truly required = new pts();
    public virtual Pts Pts { get; set; } = new Pts();

}
