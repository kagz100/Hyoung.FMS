using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Hyoung.FMS.Model.Models;

namespace Hyoung.FMS.Model.DataAccess
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

        public virtual DbSet<Drivers> Drivers { get; set; }
        public virtual DbSet<Heayvconsumption> Heayvconsumption { get; set; }
        public virtual DbSet<Issuecategory> Issuecategory { get; set; }
        public virtual DbSet<Issuetracker> Issuetracker { get; set; }
        public virtual DbSet<Lightvehicleconsumption> Lightvehicleconsumption { get; set; }
        public virtual DbSet<Site> Site { get; set; }
        public virtual DbSet<Systemusers> Systemusers { get; set; }
        public virtual DbSet<Vehicle> Vehicle { get; set; }
        public virtual DbSet<Vehicletype> Vehicletype { get; set; }

     
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Drivers>(entity =>
            {
                entity.ToTable("drivers");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.UserId)
                    .HasName("UserID_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.DefaultAssignedVehicleId).HasColumnName("DefaultAssignedVehicleID");

                entity.Property(e => e.EmpNo)
                    .HasColumnName("Emp no")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.PhoneNumber).HasColumnName("Phone Number");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<Heayvconsumption>(entity =>
            {
                entity.ToTable("heayvconsumption");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.AvgSpeed).HasColumnType("int(11)");

                entity.Property(e => e.Comments)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.DriverId)
                    .HasColumnName("DriverID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.DriverName)
                    .HasColumnName("Driver Name")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.ExpectedFuelEff).HasColumnName("Expected Fuel Eff");

                entity.Property(e => e.FlowMeterEngHrs)
                    .HasColumnName("Flow meter Eng Hrs")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FlowMeterFuelEff)
                    .HasColumnName("Flow meter Fuel eff")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FlowMeterFuelLost)
                    .HasColumnName("Flow meter Fuel lost")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FlowMeterTotalFuel)
                    .HasColumnName("Flow meter Total fuel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FuelLost).HasColumnName("Fuel Lost");

                entity.Property(e => e.MaxSpeed).HasColumnType("int(11)");

                entity.Property(e => e.RunTimeBurnedRateLHr).HasColumnName("Run time Burned Rate (l/hr)");

                entity.Property(e => e.RuntimeEngHrs).HasColumnName("Runtime Eng hrs");

                entity.Property(e => e.Site)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.SiteId)
                    .HasColumnName("SiteID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.TotalFuel).HasColumnName("Total fuel");

                entity.Property(e => e.VehicleId)
                    .HasColumnName("VehicleID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.VehicleName)
                    .HasColumnName("Vehicle Name")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            modelBuilder.Entity<Issuecategory>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("issuecategory");

                entity.Property(e => e.CategoryName)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Description)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Issuetracker>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("issuetracker");

                entity.Property(e => e.AssignedTo)
                    .HasColumnName("Assigned To")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Attachements)
                    .HasColumnType("mediumtext")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.ClosingComment)
                    .HasColumnName("Closing Comment")
                    .HasColumnType("mediumtext")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.ClosingDate).HasColumnName("Closing Date");

                entity.Property(e => e.DueDate).HasColumnName("Due date");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IssueCategory).HasColumnType("int(11)");

                entity.Property(e => e.OpenBy)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.OpenDate).HasColumnName("Open Date");

                entity.Property(e => e.Priority)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.ProblemDescription)
                    .HasColumnName("Problem Description")
                    .HasColumnType("mediumtext")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.ProblemTitle)
                    .HasColumnName("Problem Title")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.RelatedIssue)
                    .HasColumnName("Related Issue")
                    .HasColumnType("mediumtext")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Site).HasColumnType("int(11)");

                entity.Property(e => e.Status)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            modelBuilder.Entity<Lightvehicleconsumption>(entity =>
            {
                entity.ToTable("lightvehicleconsumption");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.AverageSpeed).HasColumnName("Average Speed");

                entity.Property(e => e.Comments)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Driver)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.DriverId)
                    .HasColumnName("DriverID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ExpectedFuelAvgKmL).HasColumnName("Expected Fuel Avg (km/l)");

                entity.Property(e => e.FlowMeterFuelEff)
                    .HasColumnName("Flow meter Fuel eff")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FlowMeterTotalFuel)
                    .HasColumnName("Flow  meter Total Fuel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FowMeterFuelLost)
                    .HasColumnName("Fow meter Fuel lost")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FuelEfficiency).HasColumnName("Fuel Efficiency");

                entity.Property(e => e.FuelLost).HasColumnName("Fuel lost");

                entity.Property(e => e.MaxSpeed).HasColumnName("Max Speed");

                entity.Property(e => e.Site).HasColumnType("int(11)");

                entity.Property(e => e.SiteId)
                    .HasColumnName("SiteID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.TotalDistanceGps).HasColumnName("Total Distance (GPS)");

                entity.Property(e => e.TotalFuel).HasColumnName("Total Fuel");

                entity.Property(e => e.VehicleId)
                    .HasColumnName("VehicleID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.VehicleName)
                    .IsRequired()
                    .HasColumnName("Vehicle Name")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            modelBuilder.Entity<Site>(entity =>
            {
                entity.ToTable("site");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            modelBuilder.Entity<Systemusers>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("systemusers");

                entity.Property(e => e.Email)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.FirstName)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.LastName)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.PhoneNumber)
                    .HasColumnType("mediumtext")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.RoleId)
                    .HasColumnName("RoleID")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PRIMARY");

                entity.ToTable("vehicle");

                entity.HasIndex(e => e.HyoungNo)
                    .HasName("Hyoung No_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.UserId)
                    .HasName("UserID_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("Username_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.AssignedDriverId)
                    .HasColumnName("AssignedDriverID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.DeviceType)
                    .HasColumnName("Device Type")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.ExpectFuelConsumptionHr)
                    .HasColumnName("Expect Fuel Consumption Hr")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ExpectdFuelComs)
                    .HasColumnName("Expectd_fuelComs")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FlowMeterCalibrtaion)
                    .HasColumnName("Flow meter calibrtaion")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.FlowMeterInstalledDate)
                    .HasColumnName("Flow meter installed date")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FlowMeterSerialNumber)
                    .HasColumnName("flow meter serial number")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Fuel)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Fuel2)
                    .HasColumnName("Fuel 2")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.FuelSensorSerialNo)
                    .HasColumnName("Fuel sensor Serial no")
                    .HasColumnType("int(11)");

                entity.Property(e => e.HyoungNo)
                    .IsRequired()
                    .HasColumnName("Hyoung No")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Imei).HasColumnName("IMEI");

                entity.Property(e => e.InstalledDate).HasColumnName("Installed Date");

                entity.Property(e => e.Model)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.PhoneNumber).HasColumnName("Phone Number");

                entity.Property(e => e.SecurityTag)
                    .HasColumnName("Security Tag")
                    .HasColumnType("int(11)");

                entity.Property(e => e.TankCapacity)
                    .HasColumnName("Tank capacity")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Vehicletypeid).HasColumnType("int(11)");
            });

            modelBuilder.Entity<Vehicletype>(entity =>
            {
                entity.ToTable("vehicletype");

                entity.HasIndex(e => e.Id)
                    .HasName("ID_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Abbvr)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Type)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
