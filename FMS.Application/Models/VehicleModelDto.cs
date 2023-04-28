using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FMS.Application.Models
{
    public class VehicleModelDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        public string Name { get; set; }
        public int ManufacturerId { get; set; }
    }
}
