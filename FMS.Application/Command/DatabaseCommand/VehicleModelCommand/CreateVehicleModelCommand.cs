using MediatR;
using FMS.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using FMS.Persistence.DataAccess;
using Microsoft.Extensions.Logging;

namespace FMS.Application.Command.DatabaseCommand.VehicleModelCommand
{
    public class CreateVehicleModelCommand : IRequest<Vehiclemodel>
    {
        public int? ManufacturerId { get; set; }
        public string Name { get; set; }  
  }


    public class CreateVehicleModelCommandHandler : IRequestHandler<CreateVehicleModelCommand, Vehiclemodel>
    {
private readonly GpsdataContext _context;   
private readonly IMediator _mediator;   

private readonly ILogger _logger;

        public CreateVehicleModelCommandHandler( GpsdataContext context, IMediator mediator, ILogger<CreateVehicleModelCommandHandler> logger)
        {
            _context = context;
            _mediator = mediator;
            _logger = logger;
        }
        

        public async Task<Vehiclemodel> Handle(CreateVehicleModelCommand request, CancellationToken cancellationToken)
        {
            var vehicleModel = new Vehiclemodel
            {
                Name = request.Name.ToUpper(),
                ManufacturerId = request.ManufacturerId
            };

            _context.Vehiclemodels.Add(vehicleModel);

            try
            {
                await _context.SaveChangesAsync(cancellationToken);

                return vehicleModel;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateVehicleModelCommandHandler");
                throw;
            }

        }

    }
}