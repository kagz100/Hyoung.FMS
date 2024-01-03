using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FMS.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updatedTankMeaurementData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "latin1");

                      

          

            


           

            migrationBuilder.CreateIndex(
                name: "IX_tankmeasurement_SiteId",
                table: "tankmeasurement",
                column: "SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_tankmeasurement_TankId",
                table: "tankmeasurement",
                column: "TankId");

            migrationBuilder.CreateIndex(
                name: "tankmeasurement_alarm_idx",
                table: "tankmeasurement",
                column: "Alarm");


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        { 

           
        }
    }
}
