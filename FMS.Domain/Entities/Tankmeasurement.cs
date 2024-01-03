using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FMS.Domain.Entities;

public partial class Tankmeasurement
{
    public int Id { get; set; }

    [Required]
    public DateTime DateTime { get; set; }

    [Required]
    public int Tank { get; set; }

    public int FuelGradeId { get; set; }
    [Required]
    public string? PTSId { get; set; }

    [Required]
    public int PacketId { get; set; }

    public string?  Status { get; set; }
    public double? ProductHeight { get; set; }
    public double? ProductUllage { get; set; }
    public double? ProductTcvolume { get; set; }
    public double? ProductDensity { get; set; }
    public double? ProductMass { get; set; }
    public double? ProductVolume { get; set; }

    public double? WaterHeight { get; set; }
    public double? Temperature { get; set; }


    public double? WaterVolume { get; set; }


   public List<Alarm>? Alarms { get; set; }


    public int? TankFillingPercentage { get; set; }

    public string? ConfigurationId { get; set; }

    // public virtual Alarm? AlarmNavigation { get; set; }

    public virtual ICollection<AlarmTankmeasurement> AlarmTankmeasurements { get; set; } = new List<AlarmTankmeasurement>();



}
