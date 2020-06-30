using FMS.Application.Common.Interfaces;
using FMS.Domain.Entities;
using FMS.Domain.TelemetryModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Persistence.GpsGateService
{
    public partial class GPSgateContext : DbContext, IGPSGateWebserviceContext
    {

        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleTelemetryReport> VehicleTelemetryReports { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public DbSet<Report> Reports { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
