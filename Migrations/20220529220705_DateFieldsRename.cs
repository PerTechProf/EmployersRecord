using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployersRecord.Migrations
{
    public partial class DateFieldsRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "hireDate",
                table: "AspNetUsers",
                newName: "HireDate");

            migrationBuilder.RenameColumn(
                name: "fireDate",
                table: "AspNetUsers",
                newName: "FireDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HireDate",
                table: "AspNetUsers",
                newName: "hireDate");

            migrationBuilder.RenameColumn(
                name: "FireDate",
                table: "AspNetUsers",
                newName: "fireDate");
        }
    }
}
