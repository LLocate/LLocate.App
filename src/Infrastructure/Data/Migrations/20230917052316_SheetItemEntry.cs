using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LLocate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SheetItemEntry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SheetItemEntry_SheetItems_SheetItemId",
                table: "SheetItemEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SheetItemEntry",
                table: "SheetItemEntry");

            migrationBuilder.RenameTable(
                name: "SheetItemEntry",
                newName: "SheetItemEntries");

            migrationBuilder.RenameIndex(
                name: "IX_SheetItemEntry_SheetItemId",
                table: "SheetItemEntries",
                newName: "IX_SheetItemEntries_SheetItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SheetItemEntries",
                table: "SheetItemEntries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SheetItemEntries_SheetItems_SheetItemId",
                table: "SheetItemEntries",
                column: "SheetItemId",
                principalTable: "SheetItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SheetItemEntries_SheetItems_SheetItemId",
                table: "SheetItemEntries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SheetItemEntries",
                table: "SheetItemEntries");

            migrationBuilder.RenameTable(
                name: "SheetItemEntries",
                newName: "SheetItemEntry");

            migrationBuilder.RenameIndex(
                name: "IX_SheetItemEntries_SheetItemId",
                table: "SheetItemEntry",
                newName: "IX_SheetItemEntry_SheetItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SheetItemEntry",
                table: "SheetItemEntry",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SheetItemEntry_SheetItems_SheetItemId",
                table: "SheetItemEntry",
                column: "SheetItemId",
                principalTable: "SheetItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
