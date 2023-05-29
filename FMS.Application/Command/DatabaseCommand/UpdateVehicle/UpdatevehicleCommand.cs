using FMS.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.UpdateVehicle
{
    /// <summary>
    /// Upate vehicle Commmand
    /// </summary>
    public class UpdatevehicleCommand : IRequest<bool>
    {
        public int VehicleId { get; set; }
        public string HyoungNo { get; set; }
        public int? VehicleTypeId { get; set; }
        public int? VehicleModelId { get; set; }
        public int? VehicleManufacturerId { get; set; }
        public string Yom { get; set; }
        public decimal ExpectedAveraged { get; set; }
        public int? DefaultEmployeeId { get; set; }
        public int? WorkingSiteId { get; set; }
        public decimal? ExcessWorkingHrCost { get; set; }
        public bool AverageKmL { get; set; }
    }
}
