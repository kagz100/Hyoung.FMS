﻿using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    /// <summary>
    /// Stores different types of vehicles that are part of the fleet.
    /// </summary>
    public partial class Vehicletype
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public sbyte? IsKmPerLiter { get; set; }

        public virtual ICollection<Assest> Assests { get; } = new List<Assest>();

        public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
    }
}
