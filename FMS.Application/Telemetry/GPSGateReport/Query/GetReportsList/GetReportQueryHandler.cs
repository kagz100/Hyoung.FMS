using FMS.Application.Common.Interfaces;
using FMS.Domain.TelemetryModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Telemetry.GPSGateReport.Query.GetReportsList
{
    public class GetReportQueryHandler : IRequestHandler<GetReportListQuery, IQueryable<Report>>
    {

        private IGPSGateWebserviceContext _context;


        public GetReportQueryHandler(IGPSGateWebserviceContext context)
        {
            _context = context;
        }

    
      public  async  Task<IQueryable<Report>> IRequestHandler<GetReportListQuery, IQueryable<Report>>.Handle(GetReportListQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
