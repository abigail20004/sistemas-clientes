import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5177/api/admin/usuarios", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsuarios(res.data));
  }, [token]);

  return (
    <div className="container mt-4">
      <h3>Gestión de Usuarios</h3>
      <table className="table">
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Compras</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.email}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>{u.compras.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
