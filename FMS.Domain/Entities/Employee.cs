using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Employee
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string? EmployeeWorkNo { get; set; }

    public string? EmployeephoneNumber { get; set; }

    public long? NationalId { get; set; }

    public string? Employeestatus { get; set; }

    public int? SiteId { get; set; }

    public virtual Site? Site { get; set; }

    public virtual ICollection<Vehicleconsumption> Vehicleconsumptions { get; set; } = new List<Vehicleconsumption>();

    public virtual ICollection<Vehicle> VehiclesNavigation { get; set; } = new List<Vehicle>();

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
