using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Domain.Entities
{ 
    public class Tag : Entity

    {
        public string description { get; set; }
        public string name { get; set; }

        public virtual ICollection<Vehicle> Vehicle { get;private set; }
    }
}
