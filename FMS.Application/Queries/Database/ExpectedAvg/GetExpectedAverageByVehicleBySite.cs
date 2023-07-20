using AutoMapper;
using FMS.Application.ModelsDTOs.ExpectedAVG;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
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

        public GetExpectedAverageByVehicleBySiteHandler(GpsdataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task < List<ExpectedAVGDto>> Handle(GetExpectedAverageByVehicleBySite request, CancellationToken cancellationToken)
        {
         var result = await _context.Expectedaverages
                .Include(e => e.Vehicle)
                .Where(e => e.VehicleId == request.VehicleId && e.SiteId == request.SiteId)
                .ToListAsync(cancellationToken);
            return _mapper.Map<List<ExpectedAVGDto>>(result);

        }
    }

}
