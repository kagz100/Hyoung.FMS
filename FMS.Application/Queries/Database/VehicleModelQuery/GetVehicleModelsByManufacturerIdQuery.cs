using AutoMapper;
using FMS.Application.Models;
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
    public class GetVehicleModelsByManufacturerIdQuery : IRequest<List<VehicleModelDto>>
    {
        public int ManufacturerId { get; set; }
    }

    public class GetVehicleModelsByManufacturerIdQueryHandler : IRequestHandler<GetVehicleModelsByManufacturerIdQuery, List<VehicleModelDto>>
    {
        private readonly IMapper _mapper;
        private readonly GpsdataContext _context;

        public GetVehicleModelsByManufacturerIdQueryHandler(IMapper mapper, GpsdataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<VehicleModelDto>> Handle(GetVehicleModelsByManufacturerIdQuery request, CancellationToken cancellationToken)
        {
            var vehicleModels = await _context.Vehiclemodels
                .Where(vm => vm.ManufacturerId == request.ManufacturerId)
                .ToListAsync(cancellationToken);

            return _mapper.Map<List<VehicleModelDto>>(vehicleModels);
        }
    }









}
