import React from 'react';
import { Usuario } from './UsuariosList';

export const UsuarioCard: React.FC<{ usuario: Usuario }> = ({ usuario }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{usuario.nombre} ({usuario.rol})</h5>
        <p className="card-text">Email: {usuario.email}</p>
        <p className="card-text">Tel: {usuario.telefono}</p>
        <p className="card-text">Compras: {usuario.compras?.length || 0}</p>
      </div>
    </div>
  );
};
export {};

export default UsuarioCard;
