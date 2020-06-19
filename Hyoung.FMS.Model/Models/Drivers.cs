using Hyoung.FMS.Model.DataAccess;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hyoung.FMS.Model.Models
{
    public partial class Driver
    {
        public Driver()
        {
           
        }

        
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string EmpNo { get; set; }
        public double? PhoneNumber { get; set; }
        public virtual ICollection<Vehicle> DrivenVehicles { get; set; }


        public Vehicle DefaultVehicle { get; set; }



    }
}
