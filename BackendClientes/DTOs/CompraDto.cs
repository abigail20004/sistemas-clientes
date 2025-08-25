namespace BackendClientes.DTOs
{
    public class CompraDto
    {
        public int Id { get; set; }
        public string Producto { get; set; } = string.Empty;
        public decimal Monto { get; set; }
        public DateTime FechaCompra { get; set; }
    }

}
