using AutoMapper;
using FMS.Application.ModelsDTOs.ExpectedAVG;
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

namespace FMS.Application.Queries.Database.ExpectedAvg
{
    public class GetExpectedAVGQuery : IRequest<List<ExpectedAVGVehicleDetailsDTO>>
    {
    }


    public class GetExpectedAVGQueryHandler : IRequestHandler<GetExpectedAVGQuery, List<ExpectedAVGVehicleDetailsDTO>>
    {
        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        public GetExpectedAVGQueryHandler(GpsdataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<List<ExpectedAVGVehicleDetailsDTO>> Handle(GetExpectedAVGQuery request, CancellationToken cancellationToken)
        {

            var result = await _context.Expectedaverages.
                                   Include(x => x.Vehicle).
                                   Include(x => x.Vehicle.VehicleManufacturer).
                                   Include(x => x.Vehicle.VehicleModel).
                                   Include(x => x.Vehicle.VehicleType).
                                   Include(x => x.Vehicle.WorkingSite).
                                   Select(item => new ExpectedAVGVehicleDetailsDTO
                                   {                                              
                                    id = item.Id,
                                    vehicleID = item.VehicleId,
                                    vehicleModel = item.Vehicle.VehicleModel.Name,
                                    vehicleManufacturer = item.Vehicle.VehicleManufacturer.Name,
                                    vehicleType = item.Vehicle.VehicleType.Name,
                                    HyoungNo = item.Vehicle.HyoungNo,
                                    expectedAverageClassificationId = item.ExpectedAverageClassificationId,
                                    siteId= item.SiteId,
                                    site = item.Vehicle.WorkingSite.Name,
                                    expectedAverageClassificationName = item.ExpectedAverageClassification.Name

                                    }).
                                   ToListAsync(cancellationToken);
       return result;

          
        }
}
   
}
