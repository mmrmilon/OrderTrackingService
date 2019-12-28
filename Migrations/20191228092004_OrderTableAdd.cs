using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OrderTrackingService.Migrations
{
    public partial class OrderTableAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OrderDate = table.Column<DateTime>(nullable: false),
                    OrderNumber = table.Column<string>(nullable: true),
                    CutomerName = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    TrackingStatus = table.Column<string>(nullable: true),
                    StockKeepingUnit = table.Column<string>(nullable: true),
                    Carrier = table.Column<string>(nullable: true),
                    TrackingNumber = table.Column<string>(nullable: true),
                    ShipDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
