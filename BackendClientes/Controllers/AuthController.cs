using Microsoft.AspNetCore.Mvc;
using BackendClientes.Data;
using BackendClientes.Models;
using BackendClientes.Services;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BackendClientes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext context, JwtService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        [HttpPost("registro-cliente")]
        public async Task<IActionResult> RegistroCliente([FromBody] Usuario usuario)
        {
            usuario.ContrasenaHash = BCrypt.Net.BCrypt.HashPassword(usuario.ContrasenaHash);
            usuario.RolId = 1; // Cliente por defecto
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Cliente registrado exitosamente" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuario creds)
        {
            var usuario = await _context.Usuarios.Include(r => r.Rol)
                .FirstOrDefaultAsync(x => x.Email == creds.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(creds.ContrasenaHash, usuario.ContrasenaHash))
                return Unauthorized(new { message = "Credenciales inválidas" });

            var token = _jwt.GenerateToken(usuario);

            return Ok(new
            {
                token,
                user = new
                {
                    id = usuario.Id,
                    nombre = usuario.Nombre,
                    email = usuario.Email
                }
            });
        }

    }
}