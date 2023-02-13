using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    public partial class Vehiclemanufacturer
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public virtual ICollection<Assest> Assests { get; } = new List<Assest>();

        public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
    }
}
