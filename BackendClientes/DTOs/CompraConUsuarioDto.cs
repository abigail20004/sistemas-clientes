// BackendClientes/DTOs/CompraConUsuarioDto.cs
namespace BackendClientes.DTOs
{
    public class CompraConUsuarioDto
    {
        public int Id { get; set; }
        public string Producto { get; set; } = string.Empty;
        public decimal Monto { get; set; }
        public DateTime FechaCompra { get; set; }
        public int UsuarioId { get; set; }
        public UsuarioDto Usuario { get; set; } = null!;
    }
}
