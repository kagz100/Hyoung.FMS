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

namespace FMS.Application.Queries.Database.VehicleTypeQuery
{
    public class GetVehicleTypeQuery:IRequest<List<Vehicletype>>
    {

    }

    public class GetVehicleTypeQueryHandler:IRequestHandler<GetVehicleTypeQuery, List<Vehicletype>>
    {
        private readonly GpsdataContext _context;
        public GetVehicleTypeQueryHandler(GpsdataContext context)
        {
            _context = context;
        }
        public async Task<List<Vehicletype>> Handle(GetVehicleTypeQuery request, CancellationToken cancellationToken)
        {
            return await _context.Vehicletypes.ToListAsync(cancellationToken);
        }
    }

}
