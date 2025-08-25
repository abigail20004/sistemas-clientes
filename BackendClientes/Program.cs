using BackendClientes.Data;
using BackendClientes.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- Configuración de la base de datos ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- Servicios ---
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddScoped<JwtService>();

// --- Clave JWT segura ---
var jwtKey = builder.Configuration["Jwt:Key"]
             ?? throw new ArgumentNullException("Jwt:Key", "La clave JWT no está configurada");

// --- Configuración de autenticación JWT ---
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// --- Autorización ---
builder.Services.AddAuthorization();

var app = builder.Build();

// --- Middleware ---
app.UseAuthentication();
app.UseAuthorization();

// --- Mapear controladores ---
app.MapControllers();

// --- Ejecutar la app ---
app.Run();
