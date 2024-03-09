using AutoMapper;
using FMS.Application.ModelsDTOs.ExpectedAVG;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.ExpectedAVGCmd
{
    public class ExpectedAVGUpdateCmd : IRequest<bool>
    {
        public int Id { get; set; }

        public  ExpectedAVGDto ExpectedAVGDto { get; set; }
    }

    public class ExpectedAVGUpdateCmdHandler : IRequestHandler<ExpectedAVGUpdateCmd, bool>
    {

        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;
        

        public ExpectedAVGUpdateCmdHandler(GpsdataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Handle(ExpectedAVGUpdateCmd request, CancellationToken cancellationToken)
        {
            //find  exsisting record
            var results = await _context.Expectedaverages.FindAsync(request.Id,cancellationToken);
                
            if (results == null)
            {
                return false;
            }
                
            //user mapper for ExpectedAVGDto to ExpectedAVG
            _mapper.Map(request.ExpectedAVGDto, results);
            

            _context.Expectedaverages.Update(results);
            try
            {
                await _context.SaveChangesAsync(cancellationToken);
            }catch (DbUpdateException ex)
            {
                throw new Exception("Error updating record", ex);
            }
            return true;
        }
    }
}


