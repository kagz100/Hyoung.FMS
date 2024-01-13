using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FMS.Domain.Entities;

public partial class GpsdataContexts : DbContext
{
    public GpsdataContexts()
    {
    }

    public GpsdataContexts(DbContextOptions<GpsdataContexts> options)
        : base(options)
    {
    }

    public virtual DbSet<Alarm> Alarms { get; set; }

    public virtual DbSet<Alertrecord> Alertrecords { get; set; }

    public virtual DbSet<Asset> Assets { get; set; }

    public virtual DbSet<Calibrationdatum> Calibrationdata { get; set; }

    public virtual DbSet<Configuration> Configurations { get; set; }

    public virtual DbSet<Device> Devices { get; set; }

    public virtual DbSet<Devicemanufacturer> Devicemanufacturers { get; set; }

    public virtual DbSet<Devicemodel> Devicemodels { get; set; }


    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Expectedaverage> Expectedaverages { get; set; }

    public virtual DbSet<Expectedaverageclassification> Expectedaverageclassifications { get; set; }

    public virtual DbSet<Fuelrefil> Fuelrefils { get; set; }

    public virtual DbSet<Intankdelivery> Intankdeliveries { get; set; }

    public virtual DbSet<Issuecategory> Issuecategories { get; set; }

    public virtual DbSet<Issuepriority> Issuepriorities { get; set; }

    public virtual DbSet<Issuestatus> Issuestatuses { get; set; }

    public virtual DbSet<Issuetracker> Issuetrackers { get; set; }

    public virtual DbSet<Pts> Pts { get; set; }

    public virtual DbSet<Pumptransaction> Pumptransactions { get; set; }

    public virtual DbSet<Site> Sites { get; set; }

    public virtual DbSet<Tag> Tags { get; set; }

    public virtual DbSet<TagGroup> TagGroups { get; set; }

    public virtual DbSet<Tank> Tanks { get; set; }

    public virtual DbSet<Tankmeasurement> Tankmeasurements { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Usertype> Usertypes { get; set; }

    public virtual DbSet<Vehicle> Vehicles { get; set; }

    public virtual DbSet<Vehicleconsumption> Vehicleconsumptions { get; set; }

    public virtual DbSet<Vehiclemanufacturer> Vehiclemanufacturers { get; set; }

    public virtual DbSet<Vehiclemodel> Vehiclemodels { get; set; }

    public virtual DbSet<Vehicletype> Vehicletypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=10.0.10.150;port=3306;database=gpsdata;user=root;password=Niwewenamimi1000;connection timeout=10000;command timeout=10000", Microsoft.EntityFrameworkCore.ServerVersion.Parse("5.5.61-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("latin1_swedish_ci")
            .HasCharSet("latin1");

        modelBuilder.Entity<Alarm>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("alarm");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Description).HasMaxLength(300);
            entity.Property(e => e.Name).HasMaxLength(45);
            entity.Property(e => e.Priority).HasMaxLength(45);
        });

        modelBuilder.Entity<Alertrecord>(entity =>
        {
            entity.HasKey(e => e.AlertId).HasName("PRIMARY");

            entity.ToTable("alertrecord");

            entity.Property(e => e.AlertId).HasColumnType("int(11)");
            entity.Property(e => e.Code).HasColumnType("int(11)");
            entity.Property(e => e.ConfigurationId).HasMaxLength(8);
            entity.Property(e => e.DeviceNumber).HasColumnType("int(11)");
            entity.Property(e => e.DeviceType).HasMaxLength(20);
            entity.Property(e => e.PacketId)
                .HasColumnType("int(11)")
                .HasColumnName("PacketID");
            entity.Property(e => e.Ptsid)
                .HasMaxLength(23)
                .HasColumnName("PTSId");
            entity.Property(e => e.State).HasMaxLength(20);
        });

        modelBuilder.Entity<Asset>(entity =>
        {
            entity.HasKey(e => e.AssetId).HasName("PRIMARY");

            entity.ToTable("asset");

            entity.HasIndex(e => e.VehicleManufacturerId, "VehicleManufacturerID");

            entity.HasIndex(e => e.VehicleModelId, "VehicleModelID");

            entity.HasIndex(e => e.VehicleTypeId, "VehicleTypeID");

            entity.Property(e => e.AssetId)
                .HasMaxLength(255)
                .HasColumnName("AssetID");
            entity.Property(e => e.SiteId)
                .HasMaxLength(255)
                .HasColumnName("SiteID");
            entity.Property(e => e.VehicleManufacturerId)
                .HasColumnType("int(11)")
                .HasColumnName("VehicleManufacturerID");
            entity.Property(e => e.VehicleModelId)
                .HasColumnType("int(11)")
                .HasColumnName("VehicleModelID");
            entity.Property(e => e.VehicleTypeId)
                .HasColumnType("int(11)")
                .HasColumnName("VehicleTypeID");

            entity.HasOne(d => d.VehicleManufacturer).WithMany(p => p.Assets)
                .HasForeignKey(d => d.VehicleManufacturerId)
                .HasConstraintName("asset_ibfk_2");

            entity.HasOne(d => d.VehicleModel).WithMany(p => p.Assets)
                .HasForeignKey(d => d.VehicleModelId)
                .HasConstraintName("asset_ibfk_1");

            entity.HasOne(d => d.VehicleType).WithMany(p => p.Assets)
                .HasForeignKey(d => d.VehicleTypeId)
                .HasConstraintName("asset_ibfk_3");
        });

        modelBuilder.Entity<Calibrationdatum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("calibrationdata");

            entity.HasIndex(e => e.VehicleId, "calibrationDataRow_idx");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.CalibrationData).HasColumnType("text");
            entity.Property(e => e.CalibrationDate).HasColumnName("calibrationDate");
            entity.Property(e => e.VehicleId)
                .HasMaxLength(45)
                .HasColumnName("VehicleID");

            entity.HasOne(d => d.Vehicle).WithMany(p => p.Calibrationdata)
                .HasPrincipalKey(p => p.HyoungNo)
                .HasForeignKey(d => d.VehicleId)
                .HasConstraintName("calibrationData_vehicle");
        });

        modelBuilder.Entity<Configuration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("configuration");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Configuration1).HasColumnName("Configuration");
            entity.Property(e => e.ConfigurationId).HasMaxLength(8);
            entity.Property(e => e.PacketId)
                .HasColumnType("int(11)")
                .HasColumnName("PacketID");
            entity.Property(e => e.Ptsid)
                .HasMaxLength(45)
                .HasColumnName("PTSId");
        });

        modelBuilder.Entity<Device>(entity =>
        {
            entity.HasKey(e => e.DeviceImei).HasName("PRIMARY");

            entity.ToTable("device");

            entity.Property(e => e.DeviceImei)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("DeviceIMEI");
            entity.Property(e => e.DeviceMakerId)
                .HasColumnType("int(11)")
                .HasColumnName("DeviceMakerID");
            entity.Property(e => e.DevicePhoneNumber).HasColumnType("int(11)");
        });

        modelBuilder.Entity<Devicemanufacturer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("devicemanufacturer");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(45);
        });

        modelBuilder.Entity<Devicemodel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("devicemodel");

            entity.HasIndex(e => e.DevicemanufacturerId, "deviceModel_deviceManufaturer_idx");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.DevicemanufacturerId)
                .HasColumnType("int(11)")
                .HasColumnName("DevicemanufacturerID");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasColumnName("name");

            entity.HasOne(d => d.Devicemanufacturer).WithMany(p => p.Devicemodels)
                .HasForeignKey(d => d.DevicemanufacturerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("deviceModel_deviceManufaturer");
        });


        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("employee");

            entity.HasIndex(e => e.SiteId, "Employee_site_idx");

            entity.HasIndex(e => e.NationalId, "NationalID_UNIQUE").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.EmployeeWorkNo)
                .HasMaxLength(45)
                .HasDefaultValueSql("'New'");
            entity.Property(e => e.EmployeephoneNumber)
                .HasMaxLength(45)
                .HasDefaultValueSql("'0700000000'")
                .HasColumnName("employeephoneNumber");
            entity.Property(e => e.Employeestatus)
                .HasMaxLength(45)
                .HasColumnName("employeestatus");
            entity.Property(e => e.FullName)
                .HasMaxLength(45)
                .HasDefaultValueSql("'Employee Name'");
            entity.Property(e => e.NationalId)
                .HasColumnType("bigint(20)")
                .HasColumnName("NationalID");
            entity.Property(e => e.SiteId)
                .HasColumnType("int(11)")
                .HasColumnName("SiteID");

            entity.HasOne(d => d.Site).WithMany(p => p.Employees)
                .HasForeignKey(d => d.SiteId)
                .HasConstraintName("Employee_site");
        });

        modelBuilder.Entity<Expectedaverage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("expectedaverage");

            entity.HasIndex(e => e.ExpectedAverageClassificationId, "Expected_classification_idx");

            entity.HasIndex(e => e.VehicleId, "Expected_vehicle_idx");

            entity.HasIndex(e => e.SiteId, "Site_idx");

            entity.HasIndex(e => new { e.VehicleId, e.SiteId, e.ExpectedAverageClassificationId }, "UniqueRecord").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.ExpectedAverage1)
                .HasPrecision(5, 2)
                .HasColumnName("ExpectedAverage");
            entity.Property(e => e.ExpectedAverageClassificationId)
                .HasColumnType("int(11)")
                .HasColumnName("ExpectedAverageClassificationID");
            entity.Property(e => e.SiteId)
                .HasColumnType("int(11)")
                .HasColumnName("SiteID");
            entity.Property(e => e.VehicleId)
                .HasColumnType("int(11)")
                .HasColumnName("VehicleID");

            entity.HasOne(d => d.ExpectedAverageClassification).WithMany(p => p.Expectedaverages)
                .HasForeignKey(d => d.ExpectedAverageClassificationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Expected_classification");

            entity.HasOne(d => d.Site).WithMany(p => p.Expectedaverages)
                .HasForeignKey(d => d.SiteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Expected_site");

            entity.HasOne(d => d.Vehicle).WithMany(p => p.Expectedaverages)
                .HasForeignKey(d => d.VehicleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Expected_vehicle");
        });

        modelBuilder.Entity<Expectedaverageclassification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("expectedaverageclassification");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Name).HasMaxLength(545);
        });

        modelBuilder.Entity<Fuelrefil>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fuelrefil");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.Duration).HasPrecision(10);
            entity.Property(e => e.GpsfuelRefil)
                .HasPrecision(10)
                .HasColumnName("GPSFuelRefil");
            entity.Property(e => e.ManualGpsfuelrefil)
                .HasPrecision(10)
                .HasColumnName("ManualGPSFuelrefil");
            entity.Property(e => e.VehicleId)
                .HasColumnType("int(11)")
                .HasColumnName("vehicleID");
        });

        modelBuilder.Entity<Intankdelivery>(entity =>
        {
            entity.HasKey(e => e.DeliveryId).HasName("PRIMARY");

            entity.ToTable("intankdelivery");

            entity.Property(e => e.DeliveryId).HasColumnType("int(11)");
            entity.Property(e => e.AbsoluteProductTcvolume).HasColumnName("AbsoluteProductTCVolume");
            entity.Property(e => e.ConfigurationId).HasMaxLength(8);
            entity.Property(e => e.EndProductTcvolume).HasColumnName("EndProductTCVolume");
            entity.Property(e => e.FuelGradeId).HasColumnType("int(11)");
            entity.Property(e => e.FuelGradeName).HasMaxLength(20);
            entity.Property(e => e.PacketId)
                .HasColumnType("int(11)")
                .HasColumnName("PacketID");
            entity.Property(e => e.Ptsid)
                .HasMaxLength(23)
                .HasColumnName("PTSId");
            entity.Property(e => e.StartProductTcvolume).HasColumnName("StartProductTCVolume");
            entity.Property(e => e.Tank).HasColumnType("int(11)");
        });

        modelBuilder.Entity<Issuecategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("issuecategory");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(945);
            entity.Property(e => e.Name).HasMaxLength(45);
        });

        modelBuilder.Entity<Issuepriority>(entity =>
        {
            entity.HasKey(e => e.Int).HasName("PRIMARY");

            entity.ToTable("issuepriority");

            entity.Property(e => e.Int)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("int");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Issuestatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("issuestatus", tb => tb.HasComment("		"));

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Status)
                .HasMaxLength(45)
                .HasColumnName("status");
        });

        modelBuilder.Entity<Issuetracker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("issuetracker", tb => tb.HasComment("		"));

            entity.HasIndex(e => e.Priority, "Issuetracker_priority_idx");

            entity.HasIndex(e => e.Status, "Issuetracker_status_idx");

            entity.HasIndex(e => e.AssignTo, "Issuetracker_userAsssignedTo_idx");

            entity.HasIndex(e => e.Openby, "Issuetracker_user_idx");

            entity.HasIndex(e => e.IssueCategoryId, "issetracker_issueID_idx");

            entity.HasIndex(e => e.HyoungNo, "issue_vehicle_idx");

            entity.HasIndex(e => e.SiteId, "issuetracker_site_idx");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.AssignTo).HasColumnType("int(11)");
            entity.Property(e => e.ClosingDate).HasColumnName("closingDate");
            entity.Property(e => e.DueDate).HasColumnName("dueDate");
            entity.Property(e => e.HyoungNo)
                .HasMaxLength(45)
                .HasColumnName("hyoungNo");
            entity.Property(e => e.IssueCategoryId)
                .HasColumnType("int(11)")
                .HasColumnName("IssueCategoryID");
            entity.Property(e => e.OpenDate).HasColumnName("openDate");
            entity.Property(e => e.Openby)
                .HasColumnType("int(11)")
                .HasColumnName("openby");
            entity.Property(e => e.Priority)
                .HasColumnType("int(11)")
                .HasColumnName("priority");
            entity.Property(e => e.ProblemDescription)
                .HasMaxLength(945)
                .HasColumnName("problemDescription");
            entity.Property(e => e.ProblemTitlte)
                .HasMaxLength(45)
                .HasColumnName("problemTitlte");
            entity.Property(e => e.RelatedIssue)
                .HasColumnType("int(11)")
                .HasColumnName("relatedIssue");
            entity.Property(e => e.SiteId)
                .HasColumnType("int(11)")
                .HasColumnName("siteID");
            entity.Property(e => e.Status)
                .HasColumnType("int(11)")
                .HasColumnName("status");

            entity.HasOne(d => d.AssignToNavigation).WithMany(p => p.IssuetrackerAssignToNavigations)
                .HasForeignKey(d => d.AssignTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Issuetracker_userAsssignedTo");

            entity.HasOne(d => d.HyoungNoNavigation).WithMany(p => p.Issuetrackers)
                .HasPrincipalKey(p => p.HyoungNo)
                .HasForeignKey(d => d.HyoungNo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issue_vehicle");

            entity.HasOne(d => d.IssueCategory).WithMany(p => p.Issuetrackers)
                .HasForeignKey(d => d.IssueCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issuetrcker_issuecategoryID");

            entity.HasOne(d => d.OpenbyNavigation).WithMany(p => p.IssuetrackerOpenbyNavigations)
                .HasForeignKey(d => d.Openby)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Issuetracker_useropenby");

            entity.HasOne(d => d.PriorityNavigation).WithMany(p => p.Issuetrackers)
                .HasForeignKey(d => d.Priority)
                .HasConstraintName("Issuetracker_priority");

            entity.HasOne(d => d.Site).WithMany(p => p.Issuetrackers)
                .HasForeignKey(d => d.SiteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issuetracker_site");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Issuetrackers)
                .HasForeignKey(d => d.Status)
                .HasConstraintName("Issuetracker_status");
        });

        modelBuilder.Entity<Pts>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("pts");

            entity.HasIndex(e => e.SiteId, "PTS_Site_idx");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.PtsserialNo)
                .HasMaxLength(45)
                .HasColumnName("PTSSerialNo");
            entity.Property(e => e.SiteId).HasColumnType("int(11)");

            entity.HasOne(d => d.Site).WithMany(p => p.Pts)
                .HasForeignKey(d => d.SiteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PTS_Site");

            entity.HasMany(d => d.Tanks).WithMany(p => p.Pts)
                .UsingEntity<Dictionary<string, object>>(
                    "Ptstank",
                    r => r.HasOne<Tank>().WithMany()
                        .HasForeignKey("TankId")
                        .HasConstraintName("FK_PtsTanks_tank_TankId"),
                    l => l.HasOne<Pts>().WithMany()
                        .HasForeignKey("PtsId")
                        .HasConstraintName("FK_PtsTanks_pts_PtsId"),
                    j =>
                    {
                        j.HasKey("PtsId", "TankId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("ptstanks");
                        j.HasIndex(new[] { "TankId" }, "IX_PtsTanks_TankId");
                        j.IndexerProperty<int>("PtsId").HasColumnType("int(11)");
                        j.IndexerProperty<int>("TankId").HasColumnType("int(11)");
                    });
        });

        modelBuilder.Entity<Pumptransaction>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("pumptransaction");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Amount).HasPrecision(10);
            entity.Property(e => e.ConfigurationId).HasMaxLength(45);
            entity.Property(e => e.FuelGradeId).HasColumnType("int(11)");
            entity.Property(e => e.FuelGradeName).HasMaxLength(45);
            entity.Property(e => e.Nozzle).HasColumnType("int(11)");
            entity.Property(e => e.PacketId).HasColumnType("int(11)");
            entity.Property(e => e.Price).HasPrecision(10);
            entity.Property(e => e.PtsId).HasMaxLength(45);
            entity.Property(e => e.Pump).HasColumnType("int(11)");
            entity.Property(e => e.Tag).HasMaxLength(45);
            entity.Property(e => e.Tcvolume)
                .HasPrecision(10)
                .HasColumnName("TCVolume");
            entity.Property(e => e.TotalAmount).HasPrecision(10);
            entity.Property(e => e.TotalVolume).HasPrecision(10);
            entity.Property(e => e.Transaction).HasColumnType("int(11)");
            entity.Property(e => e.UserId).HasColumnType("int(11)");
            entity.Property(e => e.Volume).HasPrecision(10);
        });

        modelBuilder.Entity<Site>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("site", tb => tb.HasComment("			"));

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tag");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<TagGroup>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tag_group");

            entity.HasIndex(e => e.VehicleId, "Tag_Vehicle_idx");

            entity.HasIndex(e => e.TagId, "Taggroup_vehicle_idx");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.TagId)
                .HasColumnType("int(11)")
                .HasColumnName("tagID");
            entity.Property(e => e.VehicleId)
                .HasMaxLength(45)
                .HasColumnName("vehicleID");
        });

        modelBuilder.Entity<Tank>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tank");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Name).HasMaxLength(45);
            entity.Property(e => e.TankHeight).HasPrecision(10);
            entity.Property(e => e.TankVolume).HasPrecision(10);
        });

        modelBuilder.Entity<Tankmeasurement>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tankmeasurement");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.ConfigurationId).HasMaxLength(45);
            entity.Property(e => e.FuelGradeId).HasColumnType("int(11)");
            entity.Property(e => e.PacketId).HasColumnType("int(11)");
            entity.Property(e => e.ProductTcvolume).HasColumnName("ProductTCVolume");
            entity.Property(e => e.Ptsid).HasColumnName("PTSId");
            entity.Property(e => e.Status).HasMaxLength(45);
            entity.Property(e => e.Tank).HasColumnType("int(11)");
            entity.Property(e => e.TankFillingPercentage).HasColumnType("int(11)");
            entity.Property(e => e.WaterHeight).HasColumnName("waterHeight");

            entity.HasMany(d => d.Alarms).WithMany(p => p.TankMeausements)
                .UsingEntity<Dictionary<string, object>>(
                    "AlarmTankmeasurement",
                    r => r.HasOne<Alarm>().WithMany()
                        .HasForeignKey("AlarmId")
                        .HasConstraintName("alarmmeasurement_alarm"),
                    l => l.HasOne<Tankmeasurement>().WithMany()
                        .HasForeignKey("TankMeausementId")
                        .HasConstraintName("alarmMeasurement_tankmeasurement"),
                    j =>
                    {
                        j.HasKey("TankMeausementId", "AlarmId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("alarm_tankmeasurement");
                        j.HasIndex(new[] { "TankMeausementId" }, "alarmMeasurement_tankmeasurement_idx");
                        j.HasIndex(new[] { "AlarmId" }, "alarmmeasurement_alarm_idx");
                        j.IndexerProperty<int>("TankMeausementId")
                            .HasColumnType("int(11)")
                            .HasColumnName("tankMeausementID");
                        j.IndexerProperty<int>("AlarmId")
                            .HasColumnType("int(11)")
                            .HasColumnName("alarmID");
                    });
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user", tb => tb.HasComment("	"));

            entity.HasIndex(e => e.UserType, "user_usertype_idx");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName)
                .HasMaxLength(45)
                .HasColumnName("Full Name");
            entity.Property(e => e.Password)
                .HasMaxLength(1045)
                .HasColumnName("password");
            entity.Property(e => e.UserType)
                .HasColumnType("int(11)")
                .HasColumnName("userType");

            entity.HasOne(d => d.UserTypeNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserType)
                .HasConstraintName("user_usertype");
        });

        modelBuilder.Entity<Usertype>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("usertype", tb => tb.HasComment("			"));

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Type)
                .HasMaxLength(45)
                .HasColumnName("type");
        });

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.VehicleId).HasName("PRIMARY");

            entity.ToTable("vehicle");

            entity.HasIndex(e => e.HyoungNo, "HyoungNo_UNIQUE").IsUnique();

            entity.HasIndex(e => e.DeviceId, "Vehicle_Device_idx");

            entity.HasIndex(e => e.DefaultEmployeeId, "Vehicle_employee_idx");

            entity.HasIndex(e => e.WorkingExpectedAverage, "vehicleExpectedAverage_idx");

            entity.HasIndex(e => e.VehicleManufacturerId, "vehicle_manufacturer_idx");

            entity.HasIndex(e => e.VehicleModelId, "vehicle_model_idx");

            entity.HasIndex(e => e.WorkingSiteId, "vehicle_site_idx");

            entity.HasIndex(e => e.VehicleTypeId, "vehicle_vehicleType_idx");

            entity.Property(e => e.VehicleId)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("vehicleID");
            entity.Property(e => e.AverageKmL).HasColumnName("Average_km_l");
            entity.Property(e => e.Capacity).HasMaxLength(45);
            entity.Property(e => e.CurrentPhysicalReading).HasMaxLength(45);
            entity.Property(e => e.DefaultEmployeeId)
                .HasColumnType("int(11)")
                .HasColumnName("DefaultEmployeeID");
            entity.Property(e => e.DeviceId)
                .HasColumnType("int(11)")
                .HasColumnName("DeviceID");
            entity.Property(e => e.ExcessWorkingHrCost).HasPrecision(10);
            entity.Property(e => e.GpsgategeneratedId)
                .HasColumnType("tinyint(4)")
                .HasColumnName("GPSGATEGeneratedID");
            entity.Property(e => e.HyoungNo).HasMaxLength(45);
            entity.Property(e => e.NumberPlate).HasMaxLength(45);
            entity.Property(e => e.VehicleManufacturerId)
                .HasColumnType("int(11)")
                .HasColumnName("VehicleManufacturerID");
            entity.Property(e => e.VehicleModelId)
                .HasColumnType("int(11)")
                .HasColumnName("VehicleModelID");
            entity.Property(e => e.VehicleTypeId)
                .HasDefaultValueSql("'1'")
                .HasColumnType("int(11)")
                .HasColumnName("VehicleTypeID");
            entity.Property(e => e.WorkingExpectedAverage).HasColumnType("int(11)");
            entity.Property(e => e.WorkingSiteId)
                .HasColumnType("int(11)")
                .HasColumnName("WorkingSiteID");
            entity.Property(e => e.Yom)
                .HasMaxLength(45)
                .HasColumnName("YOM");

            entity.HasOne(d => d.DefaultEmployee).WithMany(p => p.VehiclesNavigation)
                .HasForeignKey(d => d.DefaultEmployeeId)
                .HasConstraintName("Vehicle_employee");

            entity.HasOne(d => d.Device).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.DeviceId)
                .HasConstraintName("Vehicle_Device");

            entity.HasOne(d => d.VehicleManufacturer).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.VehicleManufacturerId)
                .HasConstraintName("vehicle_manufacturer");

            entity.HasOne(d => d.VehicleModel).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.VehicleModelId)
                .HasConstraintName("vehicle_model");

            entity.HasOne(d => d.VehicleType).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.VehicleTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vehicle_vehicleType");

            entity.HasOne(d => d.WorkingExpectedAverageNavigation).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.WorkingExpectedAverage)
                .HasConstraintName("vehicleExpectedAverage");

            entity.HasOne(d => d.WorkingSite).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.WorkingSiteId)
                .HasConstraintName("vehicle_site");

            entity.HasMany(d => d.Employees).WithMany(p => p.Vehicles)
                .UsingEntity<Dictionary<string, object>>(
                    "Employeevehicle",
                    r => r.HasOne<Employee>().WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("EmployeeID"),
                    l => l.HasOne<Vehicle>().WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("VehicleID"),
                    j =>
                    {
                        j.HasKey("VehicleId", "EmployeeId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("employeevehicles");
                        j.HasIndex(new[] { "EmployeeId" }, "EmployeeID_idx");
                        j.IndexerProperty<int>("VehicleId")
                            .HasColumnType("int(11)")
                            .HasColumnName("VehicleID");
                        j.IndexerProperty<int>("EmployeeId")
                            .HasColumnType("int(11)")
                            .HasColumnName("EmployeeID");
                    });
        });

        modelBuilder.Entity<Vehicleconsumption>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("vehicleconsumption");

            entity.HasIndex(e => new { e.VehicleId, e.Date, e.IsNightShift }, "vehicle_date_shift_unique").IsUnique();

            entity.HasIndex(e => e.EmployeeId, "vehicleconsumption_employee_idx");

            entity.HasIndex(e => e.SiteId, "vehicleconsumption_site_idx");

            entity.HasIndex(e => e.ModifiedBy, "vehicleconsumption_user_idx");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.AvgSpeed).HasPrecision(10, 2);
            entity.Property(e => e.Comments).HasMaxLength(100);
            entity.Property(e => e.EmployeeId)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(11)")
                .HasColumnName("EmployeeID");
            entity.Property(e => e.EngHours).HasPrecision(10);
            entity.Property(e => e.ExcessWorkingHrsCost).HasPrecision(10);
            entity.Property(e => e.ExpectedConsumption).HasPrecision(10);
            entity.Property(e => e.FlowMeterEffiency).HasPrecision(10);
            entity.Property(e => e.FlowMeterEngineHrs).HasPrecision(10);
            entity.Property(e => e.FlowMeterFuelLost).HasPrecision(10);
            entity.Property(e => e.FlowMeterFuelUsed).HasPrecision(10);
            entity.Property(e => e.FuelEfficiency).HasPrecision(10, 2);
            entity.Property(e => e.FuelLost).HasPrecision(10);
            entity.Property(e => e.IsKmperhr)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.IsModified).HasColumnType("tinyint(4)");
            entity.Property(e => e.IsNightShift)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.MaxSpeed).HasPrecision(10, 2);
            entity.Property(e => e.ModifiedBy).HasColumnType("int(11)");
            entity.Property(e => e.SiteId)
                .HasColumnType("int(11)")
                .HasColumnName("SiteID");
            entity.Property(e => e.TotalDistance).HasPrecision(10);
            entity.Property(e => e.TotalFuel).HasPrecision(10);
            entity.Property(e => e.VehicleId)
                .HasColumnType("int(11)")
                .HasColumnName("VehicleID");

            entity.HasOne(d => d.Employee).WithMany(p => p.Vehicleconsumptions)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("vehicleconsumption_employee");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.Vehicleconsumptions)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("vehicleconsumption_user");

            entity.HasOne(d => d.Site).WithMany(p => p.Vehicleconsumptions)
                .HasForeignKey(d => d.SiteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vehicleconsumption_site");

            entity.HasOne(d => d.Vehicle).WithMany(p => p.Vehicleconsumptions)
                .HasForeignKey(d => d.VehicleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vehicleconsumption_vehicle");
        });

        modelBuilder.Entity<Vehiclemanufacturer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("vehiclemanufacturer");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(45);
        });

        modelBuilder.Entity<Vehiclemodel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("vehiclemodel");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.ManufacturerId)
                .HasColumnType("int(11)")
                .HasColumnName("ManufacturerID");
            entity.Property(e => e.Name).HasMaxLength(45);
        });

        modelBuilder.Entity<Vehicletype>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("vehicletype", tb => tb.HasComment("			"));

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.Abbvr).HasMaxLength(45);
            entity.Property(e => e.Name).HasMaxLength(45);
            entity.Property(e => e.Nothinghere).HasMaxLength(45);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
