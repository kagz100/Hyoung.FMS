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

namespace FMS.Application.Command.DatabaseCommand.ExptAVGClassification
{
    public class ExptAVGClassificationCreateCmd : IRequest<ExpectedAVGClassficationDTO>
    {

        public ExpectedAVGClassficationDTO ExpctAVGClassficationDTO { get; set; }
    }

    public class ExptAVGClassificationCreateCmdHandler : IRequestHandler<ExptAVGClassificationCreateCmd, ExpectedAVGClassficationDTO>
    {
        private readonly GpsdataContext context;

        private readonly IMapper _mapper;
        public ExptAVGClassificationCreateCmdHandler(GpsdataContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
        }


        public async Task<ExpectedAVGClassficationDTO> Handle(ExptAVGClassificationCreateCmd request, CancellationToken cancellationToken)
        {
            var expectedAVGclassfication = _mapper.Map<Expectedaverageclassification>(request.ExpctAVGClassficationDTO);
            context.Expectedaverageclassifications.Add(expectedAVGclassfication);
            await context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<ExpectedAVGClassficationDTO>(expectedAVGclassfication);
        }
    }
}
    
