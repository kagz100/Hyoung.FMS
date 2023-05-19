using AutoMapper;
using FMS.Application.Models.Employee;
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
    public class GetEmployeeByIdQuery :IRequest<EmployeeDto>

    {
        public int Id { get; set; }
    }

    public class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, EmployeeDto>
    {
        private readonly IMapper _mapper;
        private readonly GpsdataContext _context;

        public GetEmployeeByIdQueryHandler(IMapper mapper, GpsdataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<EmployeeDto> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _context.Employees
                .Include(e=>e.Vehicles)
                .FirstOrDefaultAsync(e=>e.Id==request.Id,cancellationToken);


            if (result == null)
            {
                return null;
            }
            var employeeDto = _mapper.Map<EmployeeDto>(result);
            return employeeDto;
        }


    }

}
