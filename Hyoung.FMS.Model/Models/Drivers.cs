using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Drivers
    {
        public int Id { get; set; }
        public double UserId { get; set; }
        public string Name { get; set; }
        public string EmpNo { get; set; }
        public double? PhoneNumber { get; set; }
        public double? DefaultAssignedVehicleId { get; set; }
    }
}
