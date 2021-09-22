            using FMS.Domain.TelemetryModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FMS.Application.Telemetry.GPSGateReport.Query.GetReportsList
{
    public class GetReportListQuery :IRequest<IQueryable<Report>>   
    {
    }
}
