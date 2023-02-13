using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    public partial class Employee
    {
        public int Id { get; set; }

        public string FullName { get; set; } = null!;

        public string? EmployeeWorkNo { get; set; }

        public string? EmployeephoneNumber { get; set; }

        public virtual ICollection<Vehicleconsumption> Vehicleconsumptions { get; } = new List<Vehicleconsumption>();

        public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
    }
}