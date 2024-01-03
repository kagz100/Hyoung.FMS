using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class AlarmTankmeasurement
{
  //  public int Id { get; set; }

    public int? TankMeausementId { get; set; }

    public int? AlarmId { get; set; }

    public virtual Alarm? Alarm { get; set; }

    public virtual Tankmeasurement? TankMeausement { get; set; }
}
