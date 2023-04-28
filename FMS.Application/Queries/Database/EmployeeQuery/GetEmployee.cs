using FMS.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Queries.Database.EmployeeQuery
{
    public class GetEmployeeQuery:IRequest<List<Employee>>
    {

    }
}
