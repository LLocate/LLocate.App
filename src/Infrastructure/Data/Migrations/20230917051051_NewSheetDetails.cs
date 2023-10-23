using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LLocate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class NewSheetDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InstallmentNumber",
                table: "SheetItemSettings",
                newName: "InstallmentStartYear");

            migrationBuilder.RenameColumn(
                name: "CurrentIteration",
                table: "SheetItemSettings",
                newName: "InstallmentStartMonth");

            migrationBuilder.AddColumn<int>(
                name: "InstallmentEndMonth",
                table: "SheetItemSettings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InstallmentEndYear",
                table: "SheetItemSettings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeactivated",
                table: "SheetItemSettings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "SheetItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "SheetItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstallmentEndMonth",
                table: "SheetItemSettings");

            migrationBuilder.DropColumn(
                name: "InstallmentEndYear",
                table: "SheetItemSettings");

            migrationBuilder.DropColumn(
                name: "IsDeactivated",
                table: "SheetItemSettings");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "SheetItems");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "SheetItems");

            migrationBuilder.RenameColumn(
                name: "InstallmentStartYear",
                table: "SheetItemSettings",
                newName: "InstallmentNumber");

            migrationBuilder.RenameColumn(
                name: "InstallmentStartMonth",
                table: "SheetItemSettings",
                newName: "CurrentIteration");
        }
    }
}
