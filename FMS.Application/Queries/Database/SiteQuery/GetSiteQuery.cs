using FMS.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Queries.Database.SiteQuery
{
    public class GetSiteQuery : IRequest<List<Site>>

    {
        public GetSiteQuery()
        {
        }
    }
}
