using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Queries.Database.EmployeeQuery
{
    public class GetEmployeeHandler:IRequestHandler<GetEmployeeQuery, List<Employee>>
    {

        private readonly GpsdataContext _context;

        public GetEmployeeHandler(GpsdataContext context)
        {
            _context = context;
        }


        public async Task<List<Employee>> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
        {
            return await _context.Employees.ToListAsync(cancellationToken);
        }
    }
       
}
