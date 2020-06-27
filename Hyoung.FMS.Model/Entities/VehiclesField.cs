using Google.Protobuf.WellKnownTypes;
using Hyoung.FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Security.Permissions;
using System.Text;

namespace Hyoung.FMS.Domain.Entities
{
    public class VehiclesField:Entity
    {
        public  string  FieldName { get; set; }

    }


    public class VehiclesFieldValue :Entity
    {
        public VehiclesField VehicleField { get; set; }

        public string Value { get; set; }

        public ICollection<Vehicle> Vehicles { get; private set; }

    }






}
