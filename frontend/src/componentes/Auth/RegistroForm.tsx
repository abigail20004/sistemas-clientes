// src/componentes/Auth/RegistroClienteForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

interface FormData {
  nombre: string;
  email: string;
  contrasenaHash: string;
  telefono: string;
}

const RegistroForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/auth/registro-cliente", data);
      alert("Usuario registrado correctamente!");
      reset();
      navigate("/login");
    } catch {
      alert("Error al registrar el usuario");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-5 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Registro de Cliente</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control form-control-lg"
              {...register("nombre", { required: true })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control form-control-lg"
              {...register("telefono", { required: true })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg"
              {...register("contrasenaHash", { required: true })}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 btn-lg">
            Registrarse
          </button>
          <p className="text-center mt-3">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistroForm;
