using Hyoung.FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hyoung.FMS.Domain.Entities
{
    public partial class Driver:Entity
    {
        public Driver()
        {
            DrivenVehicles = new HashSet<Vehicle>();
        }

        
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string EmpNo { get; set; }
        public double? PhoneNumber { get; set; }
        public virtual ICollection<Vehicle> DrivenVehicles { get;private set; }


        public Vehicle DefaultVehicle { get; set; }



    }
}
