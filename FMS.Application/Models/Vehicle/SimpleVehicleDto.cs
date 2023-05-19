using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FMS.Application.Models.Vehicle
{
    public class SimpleVehicleDto
    {
        [JsonPropertyName("vehicleId")]
        public int VehicleId { get; set; }
     
        public string HyoungNo { get; set; }
    }

}
