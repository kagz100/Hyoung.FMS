using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{

    public partial class TagGroup
    {
        public int Id { get; set; }

        public string VehicleId { get; set; } = null!;

        public int TagId { get; set; }
    }
}
