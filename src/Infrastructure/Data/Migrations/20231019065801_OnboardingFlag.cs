using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LLocate.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class OnboardingFlag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DefaultDarkMode",
                table: "AspNetUsers",
                newName: "IsCompleteOnboarding");

            migrationBuilder.AddColumn<string>(
                name: "DefaultTheme",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultTheme",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "IsCompleteOnboarding",
                table: "AspNetUsers",
                newName: "DefaultDarkMode");
        }
    }
}
