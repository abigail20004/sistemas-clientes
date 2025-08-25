using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendClientes.Data;
using BackendClientes.DTOs;
using BackendClientes.Models;

namespace BackendClientes.Controllers
{
    [ApiController]
    [Route("api/admin/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todos los usuarios con su rol y sus compras (solo admins)
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Traemos los usuarios con Rol y Compras
            var usuarios = await _context.Usuarios
                .Include(u => u.Rol)
                .Include(u => u.Compras)
                .ToListAsync();

            // Mapeamos usando solo los DTOs existentes
            var result = usuarios.Select(u =>
            {
                return new
                {
                    Nombre = u.Nombre,
                    Email = u.Email,
                    Telefono = u.Telefono,
                    Rol = u.Rol?.NombreRol,
                    Compras = u.Compras?.Select(c => new
                    {
                        c.Id,
                        c.Producto,
                        c.Monto,
                        c.FechaCompra
                    }) ?? Enumerable.Empty<object>()  // Evita null
                };
            });

            return Ok(result);
        }
        // UsuariosController (Admin)
        [HttpPost]
        public async Task<IActionResult> CrearUsuario([FromBody] UsuarioDto usuarioDto)
        {
            var usuario = new Usuario
            {
                Nombre = usuarioDto.Nombre,
                Email = usuarioDto.Email,
                Telefono = usuarioDto.Telefono,
                RolId = 2 // por ejemplo: 2 = Cliente
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario creado" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPerfil(int id, [FromBody] UsuarioDto usuarioDto)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            usuario.Nombre = usuarioDto.Nombre;
            usuario.Email = usuarioDto.Email;
            usuario.Telefono = usuarioDto.Telefono;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Perfil actualizado" });
        }

        // Eliminar usuario (solo admins)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario eliminado" });
        }
    }
}
