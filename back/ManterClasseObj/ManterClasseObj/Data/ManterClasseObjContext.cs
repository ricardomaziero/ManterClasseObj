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
    }
}
