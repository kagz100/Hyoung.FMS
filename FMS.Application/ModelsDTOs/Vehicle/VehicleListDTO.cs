using FMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FMS.Application.Models.Vehicle
{
    public class VehicleListDTO
    {
        public int VehicleId { get; set; }

        public string HyoungNo { get; set; } = null!;

        public int VehicleTypeId { get; set; }

        public int? VehicleModelId { get; set; }

        public int? VehicleManufacturerId { get; set; }

        //change to date
        /// <summary>
        /// year of manufacture ...change to date
        /// </summary>
        public string Yom { get; set; }

        public decimal ExpectedAveraged { get; set; }


        public int? DefaultEmployeeId { get; set; }

        public int? WorkingSiteId { get; set; }

        public decimal? ExcessWorkingHrCost { get; set; }

        /// <summary>
        /// Change if vehicle is using km/l or l/hr
        /// </summary>
        public bool AverageKmL { get; set; }


        public int? DefaultExpectedAverageId { get; set; }

[JsonIgnore()]

        public string ExpectedAverageclassificationName { get; set; } = null!;

[JsonIgnore()]
        public decimal? ExpectedAverageValue { get; set; }


         public string CombinedExpectedAverage => $"{ExpectedAverageclassificationName} {ExpectedAverageValue}"  ?? "";

    }
}
