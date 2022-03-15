using System.ComponentModel.DataAnnotations;

namespace ManterClasseObj.Model
{
    public class ClasseRicardo
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Descricao { get; set; }

        public bool Ativo { get; set; }
    }
}
