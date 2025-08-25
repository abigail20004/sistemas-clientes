import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UsuarioCard } from './UsuarioCard';

export interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  compras?: any[];
}

export const UsuariosList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    axios.get<Usuario[]>('http://localhost:5177/api/admin/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-3">
      {usuarios.map(u => <UsuarioCard key={u.email} usuario={u} />)}
    </div>
  );
};
