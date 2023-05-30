using FMS.Application.Models.Vehicle;
using FMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FMS.Application.ModelsDTOs.ExpectedAVG
{
    public class ExpectedAVGDto
    {

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("ExpectedAverage1")]
        public decimal ExpectedAverage1 { get; set; }

        [JsonPropertyName("expectedAverageClassificationId")]
        public int ExpectedAverageClassificationId { get; set; }

        [JsonPropertyName("vehicleId")]
        public int VehicleId { get; set; }

        [JsonPropertyName("site")]
        public int? SiteId { get; set; }



    }
}
