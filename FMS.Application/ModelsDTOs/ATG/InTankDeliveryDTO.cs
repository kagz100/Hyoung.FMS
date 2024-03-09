using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.ModelsDTOs.ATG
{
    public class InTankDeliveryDTO
    {
        public int DeliveryId { get; set; }

        public int Tank { get; set; }

        public int FuelGradeId { get; set; }

        public string FuelGradeName { get; set; }

        public DateTime? StartDateTime { get; set; }

        public float? StartProductHeight { get; set; }

        public float? StartWaterHeight { get; set; }

        public float? StartTemperature { get; set; }

        public float? StartProductVolume { get; set; }

        public float? StartProductTcvolume { get; set; }

        public float? StartProductDensity { get; set; }

        public float? StartProductMass { get; set; }

        public DateTime? EndDateTime { get; set; }

        public float? EndProductHeight { get; set; }

        public float? EndWaterHeight { get; set; }

        public float? EndTemperature { get; set; }

        public float? EndProductVolume { get; set; }

        public float? EndProductTcvolume { get; set; }

        public float? EndProductDensity { get; set; }

        public float? EndProductMass { get; set; }

        public float? AbsoluteProductHeight { get; set; }

        public float? AbsoluteWaterHeight { get; set; }

        public float? AbsoluteTemperature { get; set; }

        public float? AbsoluteProductVolume { get; set; }

        public float? AbsoluteProductTcvolume { get; set; }

        public float? AbsoluteProductDensity { get; set; }

        public float? AbsoluteProductMass { get; set; }

        public float? PumpsDispensedVolume { get; set; }

        public string ConfigurationId { get; set; }
   
 
    }
}

