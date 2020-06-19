using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Hyoung.FMS.Model.Models
{
    public class AccumulatorType
    {
        public int ID { get; set; }

        public string AccumulatorName { get; set; }

    }


    public class AccumulatorValue
    {
              
            public virtual AccumulatorType AccumulatorType { get; set; }
            public int id { get; set; }
            public DateTime timestamp { get; set; }
            public int value { get; set; }
            public virtual ICollection<Vehicle> Vehicles { get; set; }


    }
}
