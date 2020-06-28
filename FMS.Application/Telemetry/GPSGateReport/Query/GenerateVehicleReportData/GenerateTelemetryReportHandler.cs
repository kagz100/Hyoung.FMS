using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using FMS.Application.Common.Interfaces;
using MediatR;
namespace FMS.Application.Telemetry.GPSGateReport.Query.GenerateVehicleReportData
{
    public class GenerateTelemetryReportHandler:IRequestHandler<>
    {
        private readonly IFMSContext _context;
        private readonly IMapper _mapper;


        public GenerateTelemetryReportHandler (IFMSContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        //implementation

        public async Task<GenerateReportDetailViewModel> Handle ()




    }
 }
}
