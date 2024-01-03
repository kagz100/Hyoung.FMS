using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FMS.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedStatusandMulplepacketacception : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

        

           

            migrationBuilder.UpdateData(
                table: "tankmeasurement",
                keyColumn: "PTSId",
                keyValue: null,
                column: "PTSId",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "PTSId",
                table: "tankmeasurement",
                type: "longtext",
                nullable: false,
                collation: "latin1_swedish_ci",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "latin1")
                .OldAnnotation("MySql:CharSet", "latin1")
                .OldAnnotation("Relational:Collation", "latin1_swedish_ci");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "tankmeasurement",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);
        




            migrationBuilder.AlterColumn<decimal>(
                name: "TankVolume",
                table: "tank",
                type: "decimal(10)",
                precision: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10);

            migrationBuilder.AlterColumn<decimal>(
                name: "TankHeight",
                table: "tank",
                type: "decimal(10)",
                precision: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "tank",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "site",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                table: "pts",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<decimal>(
                name: "ManualGPSFuelrefil",
                table: "fuelrefil",
                type: "decimal(10)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "GPSFuelRefil",
                table: "fuelrefil",
                type: "decimal(10)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Duration",
                table: "fuelrefil",
                type: "decimal(10)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "alarm",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.CreateTable(
                name: "PtsTanks",
                columns: table => new
                {
                    PtsId = table.Column<int>(type: "int(11)", nullable: false),
                    TankId = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PtsTanks", x => new { x.PtsId, x.TankId });
                    table.ForeignKey(
                        name: "FK_PtsTanks_pts_PtsId",
                        column: x => x.PtsId,
                        principalTable: "pts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PtsTanks_tank_TankId",
                        column: x => x.TankId,
                        principalTable: "tank",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "latin1")
                .Annotation("Relational:Collation", "latin1_swedish_ci");

            migrationBuilder.CreateIndex(
                name: "IX_PtsTanks_TankId",
                table: "PtsTanks",
                column: "TankId");

            migrationBuilder.AddForeignKey(
                name: "FK_pts_tank_TankId",
                table: "pts",
                column: "TankId",
                principalTable: "tank",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tankmeasurement_alarm_AlarmNavigationId",
                table: "tankmeasurement",
                column: "AlarmNavigationId",
                principalTable: "alarm",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pts_tank_TankId",
                table: "pts");

            migrationBuilder.DropForeignKey(
                name: "FK_tankmeasurement_alarm_AlarmNavigationId",
                table: "tankmeasurement");

            migrationBuilder.DropTable(
                name: "PtsTanks");

            migrationBuilder.DropColumn(
                name: "PacketId",
                table: "tankmeasurement");

            migrationBuilder.DropColumn(
                name: "ProductUllage",
                table: "tankmeasurement");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "tankmeasurement");

            migrationBuilder.DropColumn(
                name: "Tank",
                table: "tankmeasurement");

            migrationBuilder.RenameColumn(
                name: "AlarmNavigationId",
                table: "tankmeasurement",
                newName: "Alarm");

            migrationBuilder.RenameIndex(
                name: "IX_tankmeasurement_AlarmNavigationId",
                table: "tankmeasurement",
                newName: "tankmeasurement_alarm_idx");

            migrationBuilder.RenameIndex(
                name: "IX_pts_TankId",
                table: "pts",
                newName: "PTs_tank_idx");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalFuel",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalDistance",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "FuelLost",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "FlowMeterFuelUsed",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "FlowMeterFuelLost",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "FlowMeterEngineHrs",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "FlowMeterEffiency",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "ExpectedConsumption",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "ExcessWorkingHrsCost",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "EngHours",
                table: "vehicleconsumption",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "ExcessWorkingHrCost",
                table: "vehicle",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PTSId",
                table: "tankmeasurement",
                type: "longtext",
                nullable: true,
                collation: "latin1_swedish_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "latin1")
                .OldAnnotation("MySql:CharSet", "latin1")
                .OldAnnotation("Relational:Collation", "latin1_swedish_ci");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "tankmeasurement",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<decimal>(
                name: "TankVolume",
                table: "tank",
                type: "decimal(10,30)",
                precision: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10);

            migrationBuilder.AlterColumn<decimal>(
                name: "TankHeight",
                table: "tank",
                type: "decimal(10,30)",
                precision: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "tank",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "site",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                table: "pts",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<decimal>(
                name: "ManualGPSFuelrefil",
                table: "fuelrefil",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "GPSFuelRefil",
                table: "fuelrefil",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Duration",
                table: "fuelrefil",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "alarm_tankmeasurement",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "alarm",
                type: "int(11)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int(11)")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddForeignKey(
                name: "PTs_tank",
                table: "pts",
                column: "TankId",
                principalTable: "tank",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "tankmeasurement_alarm",
                table: "tankmeasurement",
                column: "Alarm",
                principalTable: "alarm",
                principalColumn: "id");
        }
    }
}
