using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

/// <summary>
/// 			
/// </summary>
public partial class Site
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual ICollection<Expectedaverage> Expectedaverages { get; set; } = new List<Expectedaverage>();

    public virtual ICollection<Issuetracker> Issuetrackers { get; set; } = new List<Issuetracker>();

    public virtual ICollection<Pts> Pts { get; set; } = new List<Pts>();

    public virtual ICollection<Tankmeasurement> Tankmeasurements { get; set; } = new List<Tankmeasurement>();

    public virtual ICollection<Vehicleconsumption> Vehicleconsumptions { get; set; } = new List<Vehicleconsumption>();

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
