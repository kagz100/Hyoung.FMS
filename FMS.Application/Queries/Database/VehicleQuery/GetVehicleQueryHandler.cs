using AutoMapper;
using AutoMapper.QueryableExtensions;
using FMS.Application.Models;
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

namespace FMS.Application.Queries.Database.VehicleQuery
{
    
    public class GetVehicleQueryHandler: IRequestHandler<GetVehicleQuery, List<VehicleListDTO>>
    {

        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;

        public GetVehicleQueryHandler(GpsdataContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<VehicleListDTO>> Handle(GetVehicleQuery request, CancellationToken cancellationToken)
        {
            return await  _context.Vehicles.ProjectTo<VehicleListDTO>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
          
        }

   
    }
}
