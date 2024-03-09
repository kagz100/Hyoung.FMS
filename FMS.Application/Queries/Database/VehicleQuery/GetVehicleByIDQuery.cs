using AutoMapper;
using FMS.Application.Models;
using FMS.Domain.Entities;
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

namespace FMS.Application.Queries.Database.VehicleQuery
{
    public class GetVehicleByIDQuery:IRequest<Vehicle>
    {
        public int Id { get; set; }
     
    }

    public class GetVehicleByIDQueryHandler : IRequestHandler<GetVehicleByIDQuery,Vehicle>
    {


        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;


        public GetVehicleByIDQueryHandler(GpsdataContext context , IMapper mapper, ILogger<GetVehicleByIDQueryHandler> logger )
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;

        }


        public async Task<Vehicle> Handle(GetVehicleByIDQuery request, CancellationToken cancellationToken)
        {
            try
            {
                return await _context.Vehicles.Include(e=>e.Employees).FirstOrDefaultAsync(e => e.VehicleId == request.Id);
            }
            catch(MySqlException ex)
            {
               _logger.LogError(ex.Message);

                throw new Exception(ex.Message);

            }

        }
    }

}
