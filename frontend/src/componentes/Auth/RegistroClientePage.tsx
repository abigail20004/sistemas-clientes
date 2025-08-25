import React from "react";
import RegistroForm from "./RegistroForm";

const RegistroClientePage: React.FC = () => (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card p-4 shadow-sm" style={{ minWidth: "350px" }}>
      <h2 className="text-center mb-3">Crear cuenta</h2>
      <RegistroForm />
    </div>
  </div>
);

export default RegistroClientePage;
