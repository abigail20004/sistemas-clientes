import React, { useEffect, useState } from "react";
import axios from "axios";
import { CompraCard } from "./CompraCard";

export interface Compra {
  id: number;
  producto: string;
  monto: number;
  fechaCompra: string;
}

interface ComprasListProps {
  usuarioId: number;
}

export const ComprasList: React.FC<ComprasListProps> = ({ usuarioId }) => {
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(() => {
    axios.get<Compra[]>(`http://localhost:5177/api/compras/${usuarioId}`)
      .then(res => setCompras(res.data))
      .catch(err => console.error(err));
  }, [usuarioId]);

  return (
    <div className="container mt-3">
      {compras.map(c => <CompraCard key={c.id} compra={c} />)}
    </div>
  );
};
