using FMS.Domain.Entities;
using FMS.Domain.TelemetryModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Application.Common.Interfaces
{
   public  interface IGPSGateWebserviceContext
    {

        DbSet<Vehicle> Vehicles { get; set; }

        DbSet<VehicleTelemetryReport> VehicleTelemetryReports { get; set; }


        DbSet<Report> Reports { get; set; }

    }
}
