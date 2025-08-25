namespace BackendClientes.Models
{
    public class Compra
    {
        public int Id { get; set; }
        public string Producto { get; set; } = string.Empty;
        public decimal Monto { get; set; }
        public DateTime FechaCompra { get; set; }

        // Relación con Usuario
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; } = null!;
    }
}
