#nullable disable
using FMS.Application.Models.Vehicle;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FMS.Application.Models.Employee
{
    public class EmployeeDto
    {

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("fullName")]
        public string FullName { get; set; }

        [JsonPropertyName("employeeWorkNo")]
        public string EmployeeWorkNo { get; set; } = string.Empty;

        [JsonPropertyName("employeephoneNumber")]
        public string EmployeephoneNumber { get; set; } = string.Empty;

        [JsonPropertyName("nationalId")]
        public long? NationalId { get; set; }

        [JsonPropertyName("employeestatus")]
        public string Employeestatus { get; set; } = string.Empty;

        [JsonPropertyName("siteId")]
        public int? SiteId { get; set; }

        [JsonPropertyName("vehicles")]
        public ICollection<SimpleVehicleDto> Vehicles { get; set; } = new List<SimpleVehicleDto>();
    }

}
