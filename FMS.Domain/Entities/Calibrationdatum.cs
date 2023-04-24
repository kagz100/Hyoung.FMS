using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Calibrationdatum
{
    public int Id { get; set; }

    public string? VehicleId { get; set; }

    public DateTime? CalibrationDate { get; set; }

    public string? CalibrationData { get; set; }

    public virtual Vehicle? Vehicle { get; set; }
}
