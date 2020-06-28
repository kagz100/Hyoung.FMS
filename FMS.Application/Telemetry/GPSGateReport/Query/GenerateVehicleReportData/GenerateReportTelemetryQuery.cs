using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Application.Telemetry.GPSGateReport.Query.GenerateVehicleReportData
{
     public  class GenerateVehicleTelemetryQuery : IRequest<GenerateReportDetailViewModel>
    {
        public int ihandleID { get; set; }

        public int MyProperty { get; set; }
    }
}
