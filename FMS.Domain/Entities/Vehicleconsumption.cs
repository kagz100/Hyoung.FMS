using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Vehicleconsumption
{
    public int Id { get; set; }

    public int VehicleId { get; set; }

    public int SiteId { get; set; }

    public DateTime Date { get; set; }

    public decimal? MaxSpeed { get; set; }

    public decimal? AvgSpeed { get; set; }

    public decimal? ExpectedConsumption { get; set; }

    public decimal? TotalDistance { get; set; }

    public int? EmployeeId { get; set; }

    public string? Comments { get; set; }

    public decimal? FuelLost { get; set; }

    public decimal? FuelEfficiency { get; set; }

    public decimal? TotalFuel { get; set; }

    public decimal? FlowMeterFuelUsed { get; set; }

    public decimal? FlowMeterFuelLost { get; set; }

    public decimal? FlowMeterEffiency { get; set; }

    public decimal? EngHours { get; set; }

    public decimal? FlowMeterEngineHrs { get; set; }

    public decimal? ExcessWorkingHrsCost { get; set; }

    public bool IsNightShift { get; set; }

    public virtual Employee? Employee { get; set; }

    public virtual Site Site { get; set; } = null!;

    public virtual Vehicle Vehicle { get; set; } = null!;
}
