using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Vehicletype
    {
        public Vehicletype()
        {
            Vehicle = new HashSet<Vehicle>();
        }

        public int Id { get; set; }
        public string Type { get; set; }
        public string Abbvr { get; set; }

        public virtual ICollection<Vehicle> Vehicle { get; set; }
    }
}
