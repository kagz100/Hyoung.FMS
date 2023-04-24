using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

public partial class Device
{
    public int DeviceImei { get; set; }

    public int DeviceMakerId { get; set; }

    public int DevicePhoneNumber { get; set; }

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
