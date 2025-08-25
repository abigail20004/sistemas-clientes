# Sistema de Seguimiento de Clientes

Sistema con roles diferenciados (Cliente / Administrador) para gestionar clientes y sus compras. 
El proyecto está dividido en **Frontend (React + TypeScript)** y **Backend (.NET Core 8 + EF Core)** con **SQL Server** como base de datos.

---

## Tecnologías utilizadas

- **Frontend:** React + TypeScript + Bootstrap
- **Backend:** .NET Core 8 (C#) + Entity Framework Core
- **Base de datos:** SQL Server
- **Autenticación:** JWT
- **Control de versiones:** Git + GitHub
- **Testing / API:** Postman

---

## Instalación y despliegue

### Backend

```bash
git clone <URL_REPOSITORIO>
cd backend-clientes
dotnet restore
# Configurar cadena de conexión en appsettings.json
# Configurar Jwt:Key en appsettings.json
dotnet run

### Frontend
cd frontend-clientes
npm install
npm start
" Frontend corre en http://localhost:3000 y se conecta al backend en http://localhost:5177."

### Base de datos

Ejecutar script_bd.sql en SQL Server para crear la base y las tablas principales:
Roles: Cliente / Administrador
Usuarios: Información de login y perfil
Compras: Registro de compras por usuario

### Endpoints principales
| Método | Endpoint                           | Descripción                         |
| ------ | ---------------------------------- | ----------------------------------- |
| POST   | `/api/auth/registro-cliente`       | Registro de cliente                 |
| POST   | `/api/auth/login`                  | Login de usuario                    |
| GET    | `/api/compras/usuario/{usuarioId}` | Ver compras del cliente             |
| POST   | `/api/compras`                     | Registrar compra                    |
| GET    | `/api/admin/usuarios`              | Ver todos los clientes (solo admin) |
| PUT    | `/api/admin/usuarios/{id}`         | Actualizar información del usuario  |
| DELETE | `/api/admin/usuarios/{id}`         | Eliminar cliente (solo admin)       |

### Seguridad
- ** Roles y permisos implementados mediante middleware.**
- ** Autenticación vía JWT.**
- ** Restricción de endpoints según rol. **
