using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendClientes.Data;
using BackendClientes.DTOs;
using BackendClientes.Models;

namespace BackendClientes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComprasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ComprasController(AppDbContext context)
        {
            _context = context;
        }

        // Registrar compra
        [HttpPost]
        public async Task<IActionResult> RegistrarCompra([FromBody] Compra compra)
        {
            _context.Compras.Add(compra);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Compra registrada" });
        }

        // Obtener compras de un usuario (solo sus compras)
        [HttpGet("{usuarioId}")]
        public async Task<IActionResult> GetComprasPorUsuario(int usuarioId)
        {
            var compras = await _context.Compras
                .Where(c => c.UsuarioId == usuarioId)
                .Select(c => new CompraDto
                {
                    Id = c.Id,
                    Producto = c.Producto,
                    Monto = c.Monto,
                    FechaCompra = c.FechaCompra
                })
                .ToListAsync();

            return Ok(compras);
        }
    }
}
