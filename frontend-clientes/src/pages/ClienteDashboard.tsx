// src/ClienteDashboard.tsx
import React, { useEffect, useState } from "react";

interface Compra {
  id: number;
  producto: string;
  monto: number;
  fechaCompra: string;
}

export default function ClienteDashboard() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [producto, setProducto] = useState("");
  const [monto, setMonto] = useState<number | "">("");
  const userId = localStorage.getItem("userId");

  const fetchCompras = async () => {
    const res = await fetch(`http://localhost:5177/api/compras/usuario/${userId}`);
    const data = await res.json();
    setCompras(data);
  };

  const handleNuevaCompra = async () => {
    if (!producto || !monto) return alert("Completa todos los campos");
    await fetch("http://localhost:5177/api/compras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UsuarioId: Number(userId), Producto: producto, Monto: Number(monto) }),
    });
    setProducto("");
    setMonto("");
    fetchCompras();
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Bienvenido, {localStorage.getItem("userName")}</h2>

      <div style={{ marginBottom: 20 }}>
        <h4>Registrar Compra</h4>
        <input
          placeholder="Producto"
          value={producto}
          onChange={e => setProducto(e.target.value)}
        />
        <input
          placeholder="Monto"
          type="number"
          value={monto}
          onChange={e => setMonto(Number(e.target.value))}
        />
        <button onClick={handleNuevaCompra}>Registrar</button>
      </div>

      <div>
        <h4>Mis Compras</h4>
        {compras.length === 0 ? <p>No tienes compras</p> : (
          <ul>
            {compras.map(c => (
              <li key={c.id}>{c.producto} - Q{c.monto} - {new Date(c.fechaCompra).toLocaleDateString()}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
