// ClientePage.tsx
import React from 'react';
import { ComprasList } from '../componentes/Cliente/ComprasList';

const ClientePage: React.FC = () => {
  const usuarioId = 3; // Ajusta según el usuario logueado
  return <ComprasList usuarioId={usuarioId} />;
};

export default ClientePage;
