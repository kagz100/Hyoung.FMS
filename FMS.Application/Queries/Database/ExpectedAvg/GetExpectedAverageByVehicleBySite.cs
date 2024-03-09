using AutoMapper;
using FMS.Application.ModelsDTOs.ExpectedAVG;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Queries.Database.ExpectedAvg
{
    public class GetExpectedAverageByVehicleBySite :IRequest<List<ExpectedAVGDto>>
    {
        public int VehicleId { get; set; }
        public int SiteId { get; set; }
    }


    public class GetExpectedAverageByVehicleBySiteHandler : IRequestHandler<GetExpectedAverageByVehicleBySite, List<ExpectedAVGDto>>
    {
       
        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public GetExpectedAverageByVehicleBySiteHandler(GpsdataContext context, IMapper mapper , ILogger<GetExpectedAverageByVehicleBySiteHandler> logger)
        {
            _mapper = mapper;
            _context = context;
            _logger = logger;
        }
        public async Task < List<ExpectedAVGDto>> Handle(GetExpectedAverageByVehicleBySite request, CancellationToken cancellationToken)
        {
             //Todo: Add logic to check for nulls
             try{

         var result = await _context.Expectedaverages
                .Include(e => e.Vehicle).Include(e => e.Site).Include(e => e.ExpectedAverageClassification)
                .Where(e => e.VehicleId == request.VehicleId && e.SiteId == request.SiteId)
                .ToListAsync(cancellationToken);
            return _mapper.Map<List<ExpectedAVGDto>>(result);
             }
             catch(MySqlException ex)
             {
                _logger.LogError(ex.Message, "GetExpectedAverageByVehicleBySiteHandler");
                 throw new Exception("Error getting expected average by vehicle by site", ex);
             }

        }
    }

}
