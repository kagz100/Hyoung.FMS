using System.Text.Json.Serialization;

namespace FMS.WebClient.Models.DatabaseViewModel.ExpectedViewModel
{

    public class ExpectedAVGViewModel
    {
      

        [JsonPropertyName("expectedValue")]
        public decimal ExpectedAverageValue { get; set; }

        [JsonPropertyName("classification")]
        public int ExpectedAverageClassificationId { get; set; }

        [JsonPropertyName("vehicleId")]
        public int VehicleId { get; set; }

        [JsonPropertyName("workingSiteId")]
        public int? SiteId { get; set; }
    }
}
