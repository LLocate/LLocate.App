using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LLocate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SheetItemEntryDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SheetItemEntries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "SheetItemEntries");
        }
    }
}
