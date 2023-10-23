using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LLocate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialSheet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IterationAmount",
                table: "SheetItemSettings",
                newName: "InstallmentNumber");

            migrationBuilder.RenameColumn(
                name: "IsRecurring",
                table: "SheetItemSettings",
                newName: "IsInstallment");

            migrationBuilder.AddColumn<int>(
                name: "CurrentSheetId",
                table: "SheetSettings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "SheetItemSettings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntryType",
                table: "SheetItemSettings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "SheetItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SheetItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "EntryType",
                table: "SheetItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SheetItemEntry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SheetItemId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SheetItemEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SheetItemEntry_SheetItems_SheetItemId",
                        column: x => x.SheetItemId,
                        principalTable: "SheetItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SheetItemEntry_SheetItemId",
                table: "SheetItemEntry",
                column: "SheetItemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SheetItemEntry");

            migrationBuilder.DropColumn(
                name: "CurrentSheetId",
                table: "SheetSettings");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "SheetItemSettings");

            migrationBuilder.DropColumn(
                name: "EntryType",
                table: "SheetItemSettings");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "SheetItems");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "SheetItems");

            migrationBuilder.DropColumn(
                name: "EntryType",
                table: "SheetItems");

            migrationBuilder.RenameColumn(
                name: "IsInstallment",
                table: "SheetItemSettings",
                newName: "IsRecurring");

            migrationBuilder.RenameColumn(
                name: "InstallmentNumber",
                table: "SheetItemSettings",
                newName: "IterationAmount");
        }
    }
}
