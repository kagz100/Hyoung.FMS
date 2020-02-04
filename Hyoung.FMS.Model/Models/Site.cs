using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Site
    {
        public Site()
        {
            Heayvconsumption = new HashSet<Heayvconsumption>();
            Lightvehicleconsumption = new HashSet<Lightvehicleconsumption>();
        }

        public int Id { get; set; }
        public string Location { get; set; }

        public virtual ICollection<Heayvconsumption> Heayvconsumption { get; set; }
        public virtual ICollection<Lightvehicleconsumption> Lightvehicleconsumption { get; set; }
    }
}
