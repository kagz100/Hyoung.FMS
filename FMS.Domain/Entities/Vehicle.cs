using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FMS.Domain.Entities
{ 
    public partial class Vehicle:Entity
    {
        public Vehicle()
        {
        }
        public int CalculatedSpeed { get; set; }
        public string Description { get; set; }
        public string DeviceActivity { get; set; }
        public Device Devices { get; set; }
        public string Email { get; set; }

        public string lastTransport { get; set; }
        public string name { get; set; }
        public string phoneNumber { get; set; }
        public string surname { get; set; }
        public string username { get; set; }



        public virtual Vehicletype Vehicletype { get; set; }


        public virtual ICollection<Driver> DriversDriving { get; private set; }
        public virtual ICollection<AccumulatorValue> AccValues {get; private set; }
        public virtual ICollection<VehiclesCustomField> VehiclesFields { get; private set; }

        public virtual ICollection<Tag> Tags { get; private set; }




    }





}
