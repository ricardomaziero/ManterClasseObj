#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ManterClasseObj.Model;

namespace ManterClasseObj.Data
{
    public class ManterClasseObjContext : DbContext
    {
        public ManterClasseObjContext (DbContextOptions<ManterClasseObjContext> options)
            : base(options)
        {
        }

        public DbSet<ManterClasseObj.Model.ClasseRicardo> ClasseRicardo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClasseRicardo>().HasData(
                new ClasseRicardo { Id = 1, Descricao = "entidade (Empresa, órgão)", Ativo = true },
                new ClasseRicardo { Id = 2, Descricao = "departamento", Ativo = true },
                new ClasseRicardo { Id = 3, Descricao = "obra", Ativo = true },
                new ClasseRicardo { Id = 4, Descricao = "serviços", Ativo = true },
                new ClasseRicardo { Id = 5, Descricao = "processo", Ativo = true },
                new ClasseRicardo { Id = 6, Descricao = "política pública", Ativo = true },
                new ClasseRicardo { Id = 7, Descricao = "sistema de informações", Ativo = true },
                new ClasseRicardo { Id = 8, Descricao = "procedimento", Ativo = true },
                new ClasseRicardo { Id = 9, Descricao = "controle", Ativo = true },
                new ClasseRicardo { Id = 10, Descricao = "demonstrativo", Ativo = true },
                new ClasseRicardo { Id = 11, Descricao = "itens de orçamento", Ativo = true },
                new ClasseRicardo { Id = 12, Descricao = "normativo", Ativo = true },
                new ClasseRicardo { Id = 13, Descricao = "folha de pagamento", Ativo = true }
            );
        }
    }
}
