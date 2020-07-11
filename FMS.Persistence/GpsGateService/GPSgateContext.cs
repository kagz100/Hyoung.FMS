using FMS.Application.Common.Interfaces;
using FMS.Domain.Entities;
using FMS.Domain.TelemetryModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.Text;

namespace FMS.Persistence.GpsGateService
{
    public partial class GPSgateContext : DbContext, IGPSGateWebserviceContext
    {



        BasicHttpBinding bindinghttpbing = new BasicHttpBinding();

       


        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleTelemetryReport> VehicleTelemetryReports { get ; set ; }
        public DbSet<Report> Reports { get;set; }
    }
}
