using AutoMapper;
using FMS.Application.Common;
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
    public class ExpectedAVGClassificationUpdateCmd :IRequest<int>
    {

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public bool IskmperLiter { get; set; }

    }

    public class ExpectedAVGClassificationUpdateCmdHandler : IRequestHandler<ExpectedAVGClassificationUpdateCmd, int>
    {
        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;

        public ExpectedAVGClassificationUpdateCmdHandler(GpsdataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> Handle(ExpectedAVGClassificationUpdateCmd request, CancellationToken cancellationToken)
        {
            var entity = await _context.Expectedaverageclassifications.FindAsync(request.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Expectedaverageclassification), request.Id);
            }

            entity.Name = request.Name;
            entity.Description = request.Description;
            entity.IskmperLiter= request.IskmperLiter ? (sbyte)1:(sbyte)0;
            _context.Expectedaverageclassifications.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
