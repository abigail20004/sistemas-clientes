import React from "react";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-5" style={{ minWidth: "400px", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <p className="text-center text-muted mb-4">Ingrese con su email y contraseña</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
