using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.Models.ATGModels
{
    public class Delivery
    {
        [JsonProperty("DateTime")]
        public DateTime DateTime { get; set; }

        [JsonProperty("ProductHeight")]
        public float ProductHeight { get; set; }

        [JsonProperty("WaterHeight")]
        public float WaterHeight { get; set; }

        [JsonProperty("Temperature")]
        public float Temperature { get; set; }

        [JsonProperty("ProductVolume")]
        public float ProductVolume { get; set; }

        [JsonProperty("ProductTCVolume")]
        public float ProductTCVolume { get; set; }

        [JsonProperty("ProductDensity")]
        public float? ProductDensity { get; set; }

        [JsonProperty("ProductMass")]
        public float? ProductMass { get; set; }

        [JsonProperty("PumpsDispensedVolume")]
        public float? PumpsDispensedVolume { get; set; }
    }

}
