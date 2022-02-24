#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ManterClasseObj.API.Models;

namespace ManterClasseObj.API.Data
{
    public class ManterClasseObjAPIContext : DbContext
    {
        public ManterClasseObjAPIContext (DbContextOptions<ManterClasseObjAPIContext> options)
            : base(options)
        {
        }

        public DbSet<ManterClasseObj.API.Models.ClasseRicardo> ClasseRicardo { get; set; }
    }
}
