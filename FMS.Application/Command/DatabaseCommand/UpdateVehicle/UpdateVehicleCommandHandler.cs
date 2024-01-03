using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.UpdateVehicle
{
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


            if(existingVehicle ==null)
            {
                return false;
            }

               //update the properties of the vehicle using properties of the request
                existingVehicle.VehicleModelId = request.VehicleModelId;
               // existingVehicle.WorkingExpectedAverage = request.ExpectedAveraged;
                existingVehicle.WorkingSiteId = request.WorkingSiteId;
                existingVehicle.ExcessWorkingHrCost = request.ExcessWorkingHrCost;
                existingVehicle.DefaultEmployeeId = request.DefaultEmployeeId;  
                existingVehicle.VehicleManufacturerId = request.VehicleManufacturerId;
                existingVehicle.AverageKmL = request.AverageKmL;
                existingVehicle.VehicleTypeId = request.VehicleTypeId.Value;


            //save the changes
            _context.Vehicles.Update(existingVehicle);

            await _context.SaveChangesAsync(cancellationToken);


            return true;

        }
    }
}
