using System;
//using FMS.Application.Common.Interfaces;
using FMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FMS.Persistence.DataAccess
    {
    public partial class FMSGPSContext : DbContext
    {
        public FMSGPSContext()
        {
        }

        public FMSGPSContext(DbContextOptions<FMSGPSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<AccumulatorType> AccumulatorTypes { get; set; }
        public virtual DbSet<Issuecategory> Issuecategories { get; set; }
        public virtual DbSet<Issue> Issue { get; set; }
        public virtual DbSet<Site> Sites { get; set; }
        public virtual DbSet<SystemUsers> Systemusers { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<Vehicletype> Vehicletypes { get; set; }
        public DbSet<VehicleTelemetryReport> VehicleTelemetryReports { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public DbSet<Deduction> Deductions { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public DbSet<Device> Devices { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            base.OnModelCreating(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

