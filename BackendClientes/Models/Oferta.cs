using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendClientes.Models
{
    public class Oferta
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }  // Cliente al que se envía la oferta

        [ForeignKey("UsuarioId")]
        public Usuario? Usuario { get; set; }  // Relación con Usuario

        [Required]
        public string? Mensaje { get; set; }  // Texto de la oferta

        public DateTime Fecha { get; set; } = DateTime.Now;
    }
}
