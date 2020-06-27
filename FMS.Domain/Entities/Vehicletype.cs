using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    public partial class Vehicletype:Entity
    {
        public Vehicletype()
        {
            Vehicle = new HashSet<Vehicle>();
        }

        public int Id { get; set; }
        public string Type { get; set; }
        public string Abbvr { get; set; }


       
        public virtual ICollection<Vehicle> Vehicle { get; private set; }

        public virtual ICollection<AccumulatorType> AccumulatorTypes { get; private set; }
    }









}
