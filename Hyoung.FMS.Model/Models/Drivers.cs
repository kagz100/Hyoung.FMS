using Hyoung.FMS.Model.DataAccess;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hyoung.FMS.Model.Models
{
    public partial class Drivers
    {
        public Drivers()
        {
            Heayvconsumption = new HashSet<Heavyconsumption>();
            Lightvehicleconsumption = new HashSet<Lightvehicleconsumption>();
        }

        
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string EmpNo { get; set; }
        public double? PhoneNumber { get; set; }
        public double? DefaultAssignedVehicleId { get; set; }

        public virtual ICollection<Heavyconsumption> Heayvconsumption { get; set; }
        public virtual ICollection<Lightvehicleconsumption> Lightvehicleconsumption { get; set; }
   
   
    
    }
}
