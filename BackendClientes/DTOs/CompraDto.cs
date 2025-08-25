namespace BackendClientes.DTOs
{
    // DTO para recibir compras
    public class CompraDto
    {
        public int UsuarioId { get; set; }
        public string Producto { get; set; } = string.Empty;
        public decimal Monto { get; set; }
    }


}
