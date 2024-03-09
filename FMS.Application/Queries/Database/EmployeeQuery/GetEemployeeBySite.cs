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

 public class GetEmployeeBySiteIdQuery : IRequest<List<EmployeeDto>>
 {
     public int SiteId { get; set; }
 }


public class GetEmployeeBySiteIdQueryHandler : IRequestHandler<GetEmployeeBySiteIdQuery, List<EmployeeDto>>
{
    private readonly GpsdataContext _context;
    private readonly IMapper _mapper;
    public GetEmployeeBySiteIdQueryHandler(GpsdataContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<List<EmployeeDto>> Handle(GetEmployeeBySiteIdQuery request, CancellationToken cancellationToken)
    {
        var employees = await _context.Employees
            .Include(e => e.Vehicles)
            .Where(e => e.SiteId == request.SiteId && e.Employeestatus =="Active")
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<EmployeeDto>>(employees);

    }
}

}