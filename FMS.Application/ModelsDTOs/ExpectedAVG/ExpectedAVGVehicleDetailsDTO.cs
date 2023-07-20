using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.ModelsDTOs.ExpectedAVG
{
    public class ExpectedAVGVehicleDetailsDTO
    {

        public int id { get; set; }
        public string HyoungNo { get; set; } = null!;

        public int? vehicleID { get; set; }

        public int? expectedAverageClassificationId { get; set; } 

        public string expectedAverageClassificationName { get; set; } = null!;

        public decimal expectedAveragevalue { get; set; }
        public int? siteId { get; set; }

        public string site { get; set; } = null!;

        public string vehicleModel { get; set; } = null!;

        public string vehicleManufacturer { get; set; } = null!;
        public string vehicleType { get; set; } =   null!;

    }
}
