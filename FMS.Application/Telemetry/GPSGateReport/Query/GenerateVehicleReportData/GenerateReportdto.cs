using AutoMapper;
using FMS.Application.Common.Mappings;
using FMS.Domain.Entities;
using FMS.Domain.TelemetryModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Application.Telemetry.GPSGateReport.Query.GenerateVehicleReportData
{
  public  class GenerateReportdto : IMapFrom<Report>
    {

        public int IhandlID { get; set; }

        public DateTime StartDate { get; set; }


        public DateTime EndDate { get; set; }



        public void Mapping (Profile profile)
        {
            profile.CreateMap<VehicleTelemetryReport , GenerateVehicleReportdto>()
                .ForMember(d=>d.IhandlID, opt)
        }

    }
}
