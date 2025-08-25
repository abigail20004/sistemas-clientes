import React from "react";
import { Compra } from "./ComprasList"; 

export const CompraCard: React.FC<{ compra: Compra }> = ({ compra }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{compra.producto}</h5>
        <p className="card-text">Monto: Q.{compra.monto}</p>
        <p className="card-text">
          Fecha: {new Date(compra.fechaCompra).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
