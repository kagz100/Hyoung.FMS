using AutoMapper;
using FMS.Application.ModelsDTOs.ExpectedAVG;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.ExpectedAVGCmd
{
    public class ExpectedAVGCreateCmd : IRequest<(List<ExpectedAVGDto> created, List<ExpectedAVGDto> duplicates)>
    {

        public List<ExpectedAVGDto> ExpectedAVGDto { get; set; }
    }

    public class ExpectedAVGCreateCmdHandler : IRequestHandler<ExpectedAVGCreateCmd, (List<ExpectedAVGDto> created, List<ExpectedAVGDto> duplicates)>
    {
        private readonly GpsdataContext context;

        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public ExpectedAVGCreateCmdHandler(GpsdataContext context, IMapper mapper , ILogger<ExpectedAVGCreateCmdHandler> logger )
        {
            this.context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<(List<ExpectedAVGDto> created, List<ExpectedAVGDto> duplicates)> Handle(ExpectedAVGCreateCmd request, CancellationToken cancellationToken)
        {
            var createdExpectedAVGs = new List<ExpectedAVGDto>();
            var duplicates = new List<ExpectedAVGDto>();

            foreach(var dto in request.ExpectedAVGDto)
            {
                bool isDuplicate =await  context.Expectedaverages.AnyAsync(e => e.VehicleId == dto.VehicleId &&
                                                     e.SiteId == dto.SiteId &&
                                                      e.ExpectedAverageClassificationId == dto.ExpectedAverageClassificationId);


                if (!isDuplicate)
                {
                    var expectedAVG = new Expectedaverage
                    {
                        VehicleId = dto.VehicleId,
                        ExpectedAverageClassificationId = dto.ExpectedAverageClassificationId,
                        ExpectedAverageValue = dto.ExpectedAverageValue,
                        SiteId = dto.SiteId ?? 0

                    };
                    context.Expectedaverages.Add(expectedAVG);
                    try
                    {
                        await context.SaveChangesAsync(cancellationToken);
                        createdExpectedAVGs.Add(_mapper.Map<ExpectedAVGDto>(expectedAVG));

                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"Error saving expected average: {ex.Message}");
                    }


                }
                else
                {
                    duplicates.Add(dto);
                }
         
    }


            return (createdExpectedAVGs, duplicates);
        }

    }
}
