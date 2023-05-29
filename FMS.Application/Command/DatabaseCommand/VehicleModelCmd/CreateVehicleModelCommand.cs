using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.VehicleModelCmd
{
    public class CreateVehicleModelCommand : IRequest<int>
    {
        // Add properties for each required field in your vehicle model entity
        public string Name { get; set; }
        public int ManufacturerId { get; set; }
    }
    public class CreateVehicleModelCommandHandler : IRequestHandler<CreateVehicleModelCommand, int>
    {
        private readonly GpsdataContext _context;

        public CreateVehicleModelCommandHandler(GpsdataContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateVehicleModelCommand request, CancellationToken cancellationToken)
        {
            var vehicleModel = new Vehiclemodel
            {
                Name = request.Name,
                ManufacturerId = request.ManufacturerId,
                // Set other properties as needed
            };

            _context.Vehiclemodels.Add(vehicleModel);
            await _context.SaveChangesAsync(cancellationToken);

            return vehicleModel.Id;
        }
    }



}

