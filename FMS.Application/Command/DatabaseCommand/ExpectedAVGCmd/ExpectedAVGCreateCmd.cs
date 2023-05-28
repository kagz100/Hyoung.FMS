using AutoMapper;
using FMS.Application.Models;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.ExpectedAVGCmd
{
    public class ExpectedAVGCreateCmd : IRequest<ExpectedAVGDto>
    {

        public ExpectedAVGDto ExpectedAVGDto { get; set; }
    }

    public class ExpectedAVGCreateCmdHandler : IRequestHandler<ExpectedAVGCreateCmd, ExpectedAVGDto>
    {
        private readonly GpsdataContext context;

        private readonly IMapper _mapper;
        public ExpectedAVGCreateCmdHandler(GpsdataContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
        }


        public async Task<ExpectedAVGDto> Handle(ExpectedAVGCreateCmd request, CancellationToken cancellationToken)
        {
            var expectedAVG = _mapper.Map<Expectedaverage>(request.ExpectedAVGDto);
            context.Expectedaverages.Add(expectedAVG);
            await context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<ExpectedAVGDto>(expectedAVG);
        }

    }
}
