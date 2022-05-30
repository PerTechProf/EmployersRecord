using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployersRecord.Migrations
{
    public partial class ApplicationNameAndContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Applications");
        }
    }
}
