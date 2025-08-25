namespace BackendClientes.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ContrasenaHash { get; set; } = string.Empty;
        public string? Telefono { get; set; }

        public int RolId { get; set; }
        public Rol? Rol { get; set; }

        public List<Compra>? Compras { get; set; }
    }
}
