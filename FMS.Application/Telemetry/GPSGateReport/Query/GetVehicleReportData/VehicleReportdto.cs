using AutoMapper;
using FMS.Application.Common.Mappings;
using FMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Application.Telemetry.GPSGateReport.Query.GetVehicleReportData
{
  public  class VehicleReportdto : IMapFrom<VehicleTelemetryReport>
    {

        public int IhandlID { get; set; }

        public DateTime StartDate { get; set; }


        public DateTime EndDate { get; set; }



        public void Mapping (Profile profile)
        {
            profile.CreateMap<VehicleTelemetryReport , VehicleReportdto>()
                .ForMember(d=>d.IhandlID, opt)
        }

    }
}
