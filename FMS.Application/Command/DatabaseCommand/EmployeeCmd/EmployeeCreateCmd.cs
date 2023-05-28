using AutoMapper;
using FMS.Application.Models.Employee;
using FMS.Application.Models.Vehicle;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.EmployeeCmd
{
    public class EmployeeCreateCmd:IRequest<int>
    {
        public EmployeeDto EmployeeDto { get; set; } 
    }

    public class EmployeeCreateCmdHandler : IRequestHandler<EmployeeCreateCmd, int>
    {
        private readonly GpsdataContext context;
        private readonly IMapper _mapper;

        public EmployeeCreateCmdHandler(GpsdataContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
        }


        public Task<int> Handle(EmployeeCreateCmd request, CancellationToken cancellationToken)
        {
           var employee= _mapper.Map<Employee>(request.EmployeeDto);


            foreach (var vehicle in request.EmployeeDto.Vehicles)
            {
                var result = context.Vehicles.Find(vehicle.VehicleId);
                if (result != null)
                {
                    employee.Vehicles.Add(result);
                }
            }
            context.Employees.Add(employee);
            context.SaveChanges();
            return Task.FromResult(employee.Id);

        }
    }





}
