using Microsoft.EntityFrameworkCore;
using BackendClientes.Models;

namespace BackendClientes.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Compra> Compras { get; set; }
        public DbSet<Oferta> Ofertas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Compra>(entity =>
            {
                entity.Property(e => e.Monto)
                      .HasPrecision(18, 2); // ajustado para decimales 
            });
        }
    }
}
