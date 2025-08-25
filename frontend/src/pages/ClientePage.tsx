import React, { useState } from "react";
import { ComprasList } from "../componentes/Cliente/ComprasList";
import { Compra } from "../componentes/Cliente/ComprasList";
import { CompraForm } from "../componentes/Cliente/CompraForm";
import { useAuth } from "../context/AuthContext";

const ClientePage: React.FC = () => {
  const { user } = useAuth();
  const [compras, setCompras] = useState<Compra[]>([]);

  if (!user) return <div>Debe iniciar sesión</div>;

  const handleNuevaCompra = (compra: Compra) => {
    setCompras(prev => [...prev, compra]);
  };

  return (
    <div className="container mt-3">
      <h2>Bienvenido, {user.nombre}</h2>
      <CompraForm usuarioId={user.id} onCompraAgregada={handleNuevaCompra} />
      <ComprasList usuarioId={user.id} />
    </div>
  );
};

export default ClientePage;
