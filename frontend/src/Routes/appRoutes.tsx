import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientePage from '../pages/ClientPage';
import AdminPage from '../pages/AdminPAge';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cliente" element={<ClientePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
