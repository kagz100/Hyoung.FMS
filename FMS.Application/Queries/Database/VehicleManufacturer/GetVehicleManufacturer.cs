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

namespace FMS.Application.Queries.Database.VehicleManufacturer
{
    public class GetVehicleManufacturerQuery:IRequest<List<Vehiclemanufacturer>>
    {
    }

    public class GetVehicleManufacturerHandler:IRequestHandler<GetVehicleManufacturerQuery, List<Vehiclemanufacturer>>
    {
        private readonly GpsdataContext _context;
        public GetVehicleManufacturerHandler(GpsdataContext context)
        {
            _context = context;
        }
        public async Task<List<Vehiclemanufacturer>> Handle(GetVehicleManufacturerQuery request, CancellationToken cancellationToken)
        {
            return await _context.Vehiclemanufacturers.ToListAsync(cancellationToken);
        }
    }

    
}
