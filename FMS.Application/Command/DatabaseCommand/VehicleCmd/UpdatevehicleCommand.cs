using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.VehicleCmd
{

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

        public int? DefaultExpectedAVGId { get; set; } 
    }


    public class UpdateVehicleCommandHandler : IRequestHandler<UpdatevehicleCommand, bool>
    {

        private readonly GpsdataContext _context;

        public UpdateVehicleCommandHandler(GpsdataContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdatevehicleCommand request, CancellationToken cancellationToken)
        {
            //find the existing vehicle in the database
            var existingVehicle = await _context.Vehicles.FindAsync(request.VehicleId);


            if (existingVehicle == null)
            {
                return false;
            }

            //update the properties of the vehicle using properties of the request
            existingVehicle.VehicleModelId = request.VehicleModelId;
            existingVehicle.WorkingSiteId = request.WorkingSiteId;
            existingVehicle.ExcessWorkingHrCost = request.ExcessWorkingHrCost;
            existingVehicle.DefaultEmployeeId = request.DefaultEmployeeId;
            existingVehicle.VehicleManufacturerId = request.VehicleManufacturerId;
            existingVehicle.AverageKmL = request.AverageKmL;
            existingVehicle.VehicleTypeId = request.VehicleTypeId;
            existingVehicle.DefaultExptdAvgid = request.DefaultExpectedAVGId;

            //save the changes
            _context.Vehicles.Update(existingVehicle);

            await _context.SaveChangesAsync(cancellationToken);


            return true;

        }
    }
}
