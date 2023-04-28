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

namespace FMS.Application.Queries.Database.SiteQuery
{
    public class GetSiteQueryHandler:IRequestHandler<GetSiteQuery, List<Site>>
    {


        private readonly GpsdataContext _context;

        public GetSiteQueryHandler(GpsdataContext context)
        {
            _context = context;
        }

        
        public async Task<List<Site>> Handle(GetSiteQuery request, CancellationToken cancellationToken)
        {
           return await _context.Sites.ToListAsync(cancellationToken);
        }
    }
    
}

