﻿using Hyoung.FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Hyoung.FMS.Domain.Entities
{
    public class AccumulatorType :Entity
    {
        public string AccumulatorName { get; set; }

    }


    public class AccumulatorValue:Entity
    {
            
            public AccumulatorValue()
            {
            Vehicles = new HashSet<Vehicle>();
            }
            public virtual AccumulatorType AccumulatorType { get; set; }
            public int id { get; set; }
            public DateTime timestamp { get; set; }
            public int value { get; set; }
            public virtual ICollection<Vehicle> Vehicles { get;private set; }


    }
}