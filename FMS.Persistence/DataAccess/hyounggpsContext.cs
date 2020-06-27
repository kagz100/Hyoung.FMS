using System;
using FMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FMS.Persistence.DataAccess
    {
    public partial class HyoungGPSContext : DbContext
    {
        public HyoungGPSContext()
        {
        }

        public HyoungGPSContext(DbContextOptions<HyoungGPSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<AccumulatorType> AccumulatorTypes { get; set; }
        public virtual DbSet<Issuecategory> Issuecategories { get; set; }
        public virtual DbSet<Issue> Issue { get; set; }
        public virtual DbSet<Site> Sites { get; set; }
        public virtual DbSet<Systemusers> Systemusers { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<Vehicletype> Vehicletypes { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            base.OnModelCreating(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

