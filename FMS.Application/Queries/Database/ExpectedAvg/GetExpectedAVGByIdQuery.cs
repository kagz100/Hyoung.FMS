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

namespace FMS.Application.Queries.Database.ExpectedAvg
{
    public class GetExpectedAVGByIdQuery :IRequest<ExpectedAVGDto>
    {
        public  int  Id { get; set; }
    }

    public class GetExpectedAVGbyIdQueryHandler : IRequestHandler<GetExpectedAVGByIdQuery, ExpectedAVGDto>
    {
        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        public GetExpectedAVGbyIdQueryHandler(GpsdataContext context , IMapper mapper)
        {
           _mapper= mapper;
            _context = context; 
        }
        public async Task<ExpectedAVGDto> Handle(GetExpectedAVGByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _context.Expectedaverages
                .Include(e=>e.Vehicle)
                .FirstOrDefaultAsync(e=>e.Id==request.Id,cancellationToken);
            return _mapper.Map<ExpectedAVGDto>(result);
        }
    }
}
