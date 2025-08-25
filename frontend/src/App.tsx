import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componentes/Auth/Login";
import Register from "./componentes/Auth/RegistroClientePage";
import ClientePage from "./pages/ClientePage";
import AdminPage from "./pages/AdminPAge";
import Navbar from "./componentes/Shared/Navbar";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
