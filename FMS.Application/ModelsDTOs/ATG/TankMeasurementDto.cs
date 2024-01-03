using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using FMS.Domain.Entities;

namespace FMS.Application.ModelsDTOs.ATG
{
    public class TankMeasurementDto
    {
        
        public DateTime DateTime { get; set; }

        public int Tank { get; set; }
        public string? Status { get; set; }
        public int FuelGradeId { get; set; }

        public double? ProductHeight { get; set; }
        public double? ProductUllage { get; set; }
        public double? ProductTcvolume { get; set; }

        public double? ProductDensity { get; set; }
        public double? ProductMass { get; set; }
        public double? ProductVolume { get; set; }

        public double? WaterHeight { get; set; }

        public double? Temperature { get; set; }

        public double? WaterVolume { get; set; }
               

        public int? TankFillingPercentage { get; set; }

        public string? ConfigurationId { get; set; }

        public List<string> Alarms { get; set; }

        [JsonIgnore]
        public List<Alarm> AlarmObjects { get;set; }


        public virtual ICollection<AlarmTankmeasurement> AlarmTankmeasurements { get; set; } = new List<AlarmTankmeasurement>();

    }
}
