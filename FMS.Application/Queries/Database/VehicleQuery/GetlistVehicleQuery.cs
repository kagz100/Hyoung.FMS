using AutoMapper;
using AutoMapper.QueryableExtensions;
using FMS.Application.Models.Vehicle;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Queries.Database.VehicleQuery
{
    public class GetVehicleQuery : IRequest<List<VehicleListDTO>>
    {


    }

    public class GetVehicleQueryHandler: IRequestHandler<GetVehicleQuery, List<VehicleListDTO>>
    {

        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public GetVehicleQueryHandler(GpsdataContext context,IMapper mapper,ILogger<GetVehicleByIDQueryHandler> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<VehicleListDTO>> Handle(GetVehicleQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var results = await _context.Vehicles.Include(x => x.DefaultExptdAvg.ExpectedAverageClassification).ProjectTo<VehicleListDTO>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw new Exception(ex.Message, ex);
            }
        }

   
    }
}
