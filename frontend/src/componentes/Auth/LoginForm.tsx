// src/componentes/Auth/LoginForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth, User } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

interface FormData {
  email: string;
  contrasenaHash: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/auth/login", data);
      const { token, rol, nombre, id } = res.data;

      login({ id, nombre, rol } as User, token);
      navigate(rol === "Admin" ? "/admin" : "/cliente");
    } catch {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-5 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="usuario@correo.com"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="••••••••"
              {...register("contrasenaHash", { required: true })}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 btn-lg">
            Entrar
          </button>
          <p className="text-center mt-3">
            ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
