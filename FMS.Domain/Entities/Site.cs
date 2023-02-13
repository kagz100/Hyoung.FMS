﻿using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    /// <summary>
    /// 			
    /// </summary>
    public partial class Site
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public virtual ICollection<Issuetracker> Issuetrackers { get; } = new List<Issuetracker>();

        public virtual ICollection<Vehicleconsumption> Vehicleconsumptions { get; } = new List<Vehicleconsumption>();

        public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
    }
}
