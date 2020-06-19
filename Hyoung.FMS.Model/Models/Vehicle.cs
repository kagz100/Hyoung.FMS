using System;
using System.Collections.Generic;
using System.Linq;

namespace Hyoung.FMS.Model.Models
{
    public partial class Vehicle
    {
        public Vehicle()
        {
        }
        public int Id { get; set; }
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


        public virtual ICollection<Driver> DriversDriving { get; set; }
        public virtual ICollection<AccumulatorValue> AccValues {get;set;}
        public virtual ICollection<VehiclesField> VehiclesFields { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }




    }





}
