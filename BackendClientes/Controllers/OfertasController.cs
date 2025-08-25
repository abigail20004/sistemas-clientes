using Microsoft.AspNetCore.Mvc;
using BackendClientes.Data;
using BackendClientes.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendClientes.Controllers
{
    [ApiController]
    [Route("api/admin/[controller]")]
    public class OfertasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OfertasController(AppDbContext context)
        {
            _context = context;
        }

        // Admin envía oferta a un cliente
        [HttpPost("{usuarioId}")]
        public async Task<IActionResult> EnviarOferta(int usuarioId, [FromBody] string mensaje)
        {
            var usuario = await _context.Usuarios.FindAsync(usuarioId);
            if (usuario == null) return NotFound();

            var oferta = new Oferta
            {
                UsuarioId = usuarioId,
                Mensaje = mensaje
            };

            _context.Ofertas.Add(oferta);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Oferta enviada" });
        }

        // Opcional: ver ofertas de un usuario
        [HttpGet("usuario/{usuarioId}")]
        public async Task<IActionResult> ObtenerOfertas(int usuarioId)
        {
            var ofertas = await _context.Ofertas
            .ToListAsync(); // primero traes todas las ofertas
            var result = ofertas.Select(o => new { o.Mensaje, o.Fecha });

            return Ok(ofertas);
        }
    }
}
