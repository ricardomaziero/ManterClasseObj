using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ManterClasseObj.Migrations
{
    public partial class atual : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClasseRicardo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ativo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClasseRicardo", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ClasseRicardo",
                columns: new[] { "Id", "Ativo", "Descricao" },
                values: new object[,]
                {
                    { 1, true, "entidade (Empresa, órgão)" },
                    { 2, true, "departamento" },
                    { 3, true, "obra" },
                    { 4, true, "serviços" },
                    { 5, true, "processo" },
                    { 6, true, "política pública" },
                    { 7, true, "sistema de informações" },
                    { 8, true, "procedimento" },
                    { 9, true, "controle" },
                    { 10, true, "demonstrativo" },
                    { 11, true, "itens de orçamento" },
                    { 12, true, "normativo" },
                    { 13, true, "folha de pagamento" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClasseRicardo");
        }
    }
}
