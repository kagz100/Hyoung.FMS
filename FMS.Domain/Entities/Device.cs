using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    /// <summary>
    /// stores information about the GPS device that is installed on the vehicle or asset.
    /// </summary>
    public partial class Device
    {
        public int DeviceImei { get; set; }

        public int DeviceMakerId { get; set; }

        public int DevicePhoneNumber { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
    }
}