using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Security.Permissions;
using System.Text;

namespace FMS.Domain.Entities
{
    public class VehiclesCustomField : Entity
    {
        public string FieldName { get; set; }
    }


    public class VehiclesCustomFieldValue :Entity
    {
        public VehiclesCustomField VehicleField { get; set; }

        public string Value { get; set; }

        public ICollection<Vehicle> Vehicles { get; private set; }

    }



    public enum CustomFieldID
    {

    }


}
