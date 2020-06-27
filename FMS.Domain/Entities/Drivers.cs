using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FMS.Domain.Entities
{
    public partial class Driver:Entity
    {
        public Driver()
        {
            DrivenVehicles = new HashSet<Vehicle>();
        }

        
        public int UserId { get; set; }

        public string Name { get; set; }

        public string EmpNo { get; set; }
        public double? PhoneNumber { get; set; }
        public virtual ICollection<Vehicle> DrivenVehicles { get;private set; }


        public Vehicle DefaultVehicle { get; set; }



    }
}
