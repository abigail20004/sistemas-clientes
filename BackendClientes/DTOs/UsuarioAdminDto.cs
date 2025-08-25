namespace BackendClientes.DTOs
{
    public class UsuarioAdminDto
    {
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Telefono { get; set; }
        public string? Rol { get; set; }

        public List<CompraDto> Compras { get; set; } = new();
    }
}