using Autofac.Features.ResolveAnything;
using AutoMapper;
using FMS.Application.Models.Employee;
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

namespace FMS.Application.Queries.Database.EmployeeQuery
{
    public class GetEmployeeQuery:IRequest<List<EmployeeDto>>
    {

    }
    /// <summary>
    /// Get all active employees
    /// </summary>
    public class GetEmployeeHandler : IRequestHandler<GetEmployeeQuery, List<EmployeeDto>>
    {

        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        public GetEmployeeHandler(GpsdataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        /// <summary>
        /// Return all active employees
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<List<EmployeeDto>> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
        {
            var employees= await _context.Employees
                .Include(e => e.Vehicles)
                .Where(e => e.Employeestatus == "Active")
                .ToListAsync(cancellationToken);

            return _mapper.Map<List<EmployeeDto>>(employees);

        }
    }
}
