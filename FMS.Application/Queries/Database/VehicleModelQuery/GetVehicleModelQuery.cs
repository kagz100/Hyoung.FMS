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

namespace FMS.Application.Queries.Database.VehicleModelQuery
{
    public class GetVehicleModelQuery:IRequest<List<Vehiclemodel>>
    {
    }


    public class GetVehicleModelQueryHandler:IRequestHandler<GetVehicleModelQuery, List<Vehiclemodel>>
    {
        private readonly GpsdataContext _context;
        public GetVehicleModelQueryHandler(GpsdataContext context)
        {
            _context = context;
        }
        public async Task<List<Vehiclemodel>> Handle(GetVehicleModelQuery request, CancellationToken cancellationToken)
        {
            return await _context.Vehiclemodels.ToListAsync(cancellationToken);
        }
    }
}
