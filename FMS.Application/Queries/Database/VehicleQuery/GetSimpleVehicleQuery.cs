using AutoMapper;
using FMS.Application.Models.Vehicle;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Queries.Database.VehicleQuery
{
    public class GetSimpleVehicleQuery: IRequest<List<SimpleVehicleDto>>
    {

    }

    public class GetSimpleVehicleQueryHandler : IRequestHandler<GetSimpleVehicleQuery, List<SimpleVehicleDto>>
    {
        private readonly IMapper _mapper;
        private readonly GpsdataContext _context;

        public GetSimpleVehicleQueryHandler(IMapper mapper, GpsdataContext context)
        {
            _mapper = mapper;
            _context = context;
        }



        public async Task<List<SimpleVehicleDto>> Handle(GetSimpleVehicleQuery request, CancellationToken cancellationToken)
        {
            var results = await _context.Vehicles.ToListAsync(cancellationToken);

            return _mapper.Map<List<SimpleVehicleDto>>(results);

        }
    }

}
