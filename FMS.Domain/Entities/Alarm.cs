using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Alarm
{
    public Alarm(string name )
    {
        Name = name;
    }
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Priority { get; set; } = null!;

    public virtual ICollection<AlarmTankmeasurement> AlarmTankmeasurements { get; set; } = new List<AlarmTankmeasurement>();

    public virtual ICollection<Tankmeasurement> Tankmeasurements { get; set; } = new List<Tankmeasurement>();
}
