using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    public partial class Fuelrefil
    {
        public int Id { get; set; }

        public int VehicleId { get; set; }

        public decimal? GpsfuelRefil { get; set; }

        public decimal? ManualGpsfuelrefil { get; set; }

        public decimal? Duration { get; set; }

        public DateTime Date { get; set; }

        public DateTime? Time { get; set; }
    }
}
