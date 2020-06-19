using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Security.Permissions;
using System.Text;

namespace Hyoung.FMS.Model.Models
{
    public class VehiclesField
    {
        public int ID { get; set; }
        public  string  FieldName { get; set; }

    }


    public class VehiclesFieldValue
    {
        public VehiclesField VehicleField { get; set; }

        public string Value { get; set; }

        public ICollection<Vehicle> Vehicles { get; set; }

    }






}
