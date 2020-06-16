using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Site
    {
        public Site()
        {
            Heayvconsumption = new HashSet<Heavyconsumption>();
            Lightvehicleconsumption = new HashSet<Lightvehicleconsumption>();
        }

        public int Id { get; set; }
        public string Location { get; set; }

        public virtual ICollection<Heavyconsumption> Heayvconsumption { get; set; }
        public virtual ICollection<Lightvehicleconsumption> Lightvehicleconsumption { get; set; }
    }
}
