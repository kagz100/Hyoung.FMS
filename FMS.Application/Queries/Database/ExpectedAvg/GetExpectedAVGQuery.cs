using AutoMapper;
using FMS.Application.Models;
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

namespace FMS.Application.Queries.Database.ExpectedAvg
{
    public class GetExpectedAVGQuery:IRequest<List<ExpectedAVGDto>>
    {
    }
    

    public class GetExpectedAVGQueryHandler : IRequestHandler<GetExpectedAVGQuery, List<ExpectedAVGDto>>
    {
        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        public GetExpectedAVGQueryHandler(GpsdataContext context,IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<List<ExpectedAVGDto>> Handle(GetExpectedAVGQuery request, CancellationToken cancellationToken)
        {

            var result = await _context.Expectedaverages.ToListAsync(cancellationToken);
            return _mapper.Map<List<ExpectedAVGDto>>(result);
        }
    }
   
}
