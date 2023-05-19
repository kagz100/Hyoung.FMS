using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FMS.Application.Models.Employee;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FMS.Application.Command.DatabaseCommand.EmployeeCmd
{
    public class EmployeeUpdateCmd : IRequest<bool>
    {
        public int ID { get; set; }
        public EmployeeDto EmployeeDto { get; set; }
    }
    public class EmployeeUpdateCmdHandler : IRequestHandler<EmployeeUpdateCmd, bool>
    {
        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;

        public EmployeeUpdateCmdHandler(GpsdataContext context,IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }

        public async Task<bool> Handle(EmployeeUpdateCmd request, CancellationToken cancellationToken)
        {
            var employee = await _context.Employees.Include(e=>e.Vehicles)
                .FirstOrDefaultAsync(e=>e.Id == request.EmployeeDto.Id,cancellationToken);

            if (employee == null)
            {
                return false;
            }

            //use mapper fpr EmployeeDTo to Employee

            _mapper.Map(request.EmployeeDto,employee);



            employee.Vehicles.Clear();

            foreach(var vehicle in request.EmployeeDto.Vehicles)
            {
                var result = await _context.Vehicles.FindAsync(vehicle.VehicleId);
                if(result != null)
                {
                    employee.Vehicles.Add(result);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            return true;
            }
    }



}
