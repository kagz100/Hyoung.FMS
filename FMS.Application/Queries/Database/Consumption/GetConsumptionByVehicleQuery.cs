using AutoMapper;
using FMS.Application.Models;
using FMS.Application.ModelsDTOs.Consumption;
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

namespace FMS.Application.Queries.Database.Consumption
{
    public class GetHistoryConsumptionByVehicleQuery : IRequest<List<HistoryConsumptionDTO>>
    {
        public int VehicleId { get; set; }
        public int Entry { get; set; } = 5;

        public DateTime startDate { get; set; }
    }

    public class GetCosumptionByVehicleQueryHandler : IRequestHandler<GetHistoryConsumptionByVehicleQuery, List<HistoryConsumptionDTO>>
    {
        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public GetCosumptionByVehicleQueryHandler(GpsdataContext gpsdataContext, IMapper mapper, ILogger<GetCosumptionByVehicleQueryHandler> logger)
        {
            _context = gpsdataContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<HistoryConsumptionDTO>> Handle(GetHistoryConsumptionByVehicleQuery request, CancellationToken cancellationToken)
        {
            try
            {

                var consumptiondata = await _context.Vehicleconsumptions.
                                        Include(x=>x.Site).
                                        Include(e=>e.Employee).
                                        Where (v => v.VehicleId == request.VehicleId && v.Date.Date <=request.startDate.Date  ).
                                     OrderByDescending(v => v.Date.Date).Take(request.Entry).ToListAsync(cancellationToken);
                return _mapper.Map<List<HistoryConsumptionDTO>>(consumptiondata);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message); // 
            }


        }
    }
}
