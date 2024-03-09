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

        [JsonPropertyName("ExpectedAverageValue")]
        public decimal ExpectedAverageValue { get; set; }

        [JsonPropertyName("ExpectedAverageclassificationName")]
        public string ExpectedAverageclassificationName { get; set; }

       [JsonPropertyName("combinedExpectedAverage")]
   
         public string CombinedExpectedAverage => $"{ExpectedAverageclassificationName} {ExpectedAverageValue}";

        [JsonPropertyName("SiteName")]
        public string SiteName { get; set; }
        
        [JsonPropertyName("expectedAverageClassificationId")]
        public int ExpectedAverageClassificationId { get; set; }

        [JsonPropertyName("vehicleId")]
        public int VehicleId { get; set; }

        [JsonPropertyName("site")]
        public int? SiteId { get; set; }



    }
}
