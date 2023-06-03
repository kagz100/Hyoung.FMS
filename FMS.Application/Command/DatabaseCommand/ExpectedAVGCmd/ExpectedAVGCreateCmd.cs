using AutoMapper;
using FMS.Application.ModelsDTOs.ExpectedAVG;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.ExpectedAVGCmd
{
    public class ExpectedAVGCreateCmd : IRequest<List<ExpectedAVGDto>>
    {

        public List<ExpectedAVGDto> ExpectedAVGDto { get; set; }
    }

    public class ExpectedAVGCreateCmdHandler : IRequestHandler<ExpectedAVGCreateCmd, List<ExpectedAVGDto>>
    {
        private readonly GpsdataContext context;

        private readonly IMapper _mapper;
        public ExpectedAVGCreateCmdHandler(GpsdataContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
        }

        public async Task<List<ExpectedAVGDto>> Handle(ExpectedAVGCreateCmd request, CancellationToken cancellationToken)
        {
            var expectedAVGs = _mapper.Map<List<Expectedaverage>>(request.ExpectedAVGDto);
            var createdExpectedAVGs = new List<ExpectedAVGDto>();

            foreach (var expectedAVG in expectedAVGs)
            {
                try
                {
                    context.Expectedaverages.Add(expectedAVG);
                    await context.SaveChangesAsync(cancellationToken);
                    createdExpectedAVGs.Add(_mapper.Map<ExpectedAVGDto>(expectedAVG));
                }
                catch (DbUpdateException ex)
                when (ex.InnerException is MySqlException mysqlEx && mysqlEx.Number == 1062)
                {
                    throw new Exception("The vehicle selected already has an expected average for the site", ex);
                }
            }

            return createdExpectedAVGs;
        }

    }
}
