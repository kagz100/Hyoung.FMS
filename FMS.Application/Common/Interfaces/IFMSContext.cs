using FMS.Domain.Entities;
using FMS.Domain.TelemetryModel;
using FMS.Model.TelemetryModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Common.Interfaces
{
    public interface IFMSContext
    {

        DbSet<Deduction> Deductions { get; set; }

        DbSet<Device> Devices { get; set; }
        DbSet<Driver> Drivers { get; set; }
        DbSet<AccumulatorType> AccumulatorTypes { get; set; }
        DbSet<Issuecategory> Issuecategories { get; set; }
        DbSet<Issue> Issue { get; set; }
        DbSet<Site> Sites { get; set; }
        DbSet<SystemUsers> Systemusers { get; set; }
        DbSet<Vehicletype> Vehicletypes { get; set; }
        DbSet<Vehicle> Vehicles { get; set; }

        DbSet<VehicleTelemetryReport> VehicleTelemetryReports { get; set; }


        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
