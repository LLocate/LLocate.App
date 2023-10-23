using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LLocate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SheetDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartingBalance",
                table: "Sheets",
                newName: "TotalEarning");

            migrationBuilder.AddColumn<decimal>(
                name: "IncomingEarning",
                table: "Sheets",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IncomingEarning",
                table: "Sheets");

            migrationBuilder.RenameColumn(
                name: "TotalEarning",
                table: "Sheets",
                newName: "StartingBalance");
        }
    }
}
