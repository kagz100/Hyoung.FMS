using FMS.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FMS.WebClient.Models.DatabaseViewModel.VehicleViewModel
{
    public class VehicleViewModel
    {
        [JsonPropertyName("vehicleId")]
        public int VehicleId { get; set; }

        [JsonPropertyName("hyoungNo")]
        public string? HyoungNo { get; set; }

        [JsonPropertyName("vehicleTypeId")]
        public int VehicleTypeId { get; set; }

        [JsonPropertyName("vehicleModelId")]
        public int? VehicleModelId { get; set; }

        [JsonPropertyName("vehicleManufacturerId")]
        public int? VehicleManufacturerId { get; set; }

        [JsonPropertyName("yom")]
        public string? Yom { get; set; }

        [JsonPropertyName("workingExpectedAveraged")]
        public decimal WorkingExpectedAveraged { get; set; }

        [JsonPropertyName("defaultEmployeeId")]
        public int? DefaultEmployeeId { get; set; }

        [JsonPropertyName("workingSiteId")]
        public int? WorkingSiteId { get; set; }

        [JsonPropertyName("excessWorkingHrCost")]
        public decimal? ExcessWorkingHrCost { get; set; }

        [JsonPropertyName("averageKmL")]
        public bool AverageKmL { get; set; }



    }
}
