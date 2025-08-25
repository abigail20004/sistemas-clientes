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

        // Obtener todas las compras de un usuario
        [HttpGet("usuario/{usuarioId}")]
        public async Task<IActionResult> ObtenerCompras(int usuarioId)
        {
            var compras = await _context.Compras
                .Where(c => c.UsuarioId == usuarioId)
                .ToListAsync();

            return Ok(compras);
        }

        // Registrar compra
        [HttpPost]
        public async Task<IActionResult> RegistrarCompra([FromBody] CompraDto compraDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var compra = new Compra
            {
                UsuarioId = compraDto.UsuarioId,
                Producto = compraDto.Producto,
                Monto = compraDto.Monto,
                FechaCompra = DateTime.Now
            };

            _context.Compras.Add(compra);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Compra registrada" });
        }
    }
}
