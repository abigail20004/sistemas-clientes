import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token?: string;
  user?: { id: number; nombre: string; email: string };
  message?: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState(""); // Para registro
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await fetch(
        isRegister
          ? "http://localhost:5177/api/auth/registro-cliente"
          : "http://localhost:5177/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isRegister
              ? { nombre, Email: email, ContrasenaHash: password }
              : { Email: email, ContrasenaHash: password }
          ),
        }
      );

      const data: LoginResponse = await res.json();

      if ((res.status === 200 || res.status === 201) && data.token) {
        login(data.token, "Cliente");
        localStorage.setItem("userId", data.user?.id.toString() || "");
        localStorage.setItem("userName", data.user?.nombre || "");
        navigate("/dashboard");
      } else {
        setError(data.message || "Error desconocido");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4 text-center">{isRegister ? "Registro" : "Login"}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {isRegister && (
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="form-control mb-2"
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="form-control mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="form-control mb-2"
      />
      <button onClick={handleLogin} className="btn btn-primary w-100 mb-2">
        {isRegister ? "Registrarse" : "Entrar"}
      </button>
      <div className="text-center">
        <button
          className="btn btn-link p-0"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Ya tengo una cuenta, iniciar sesión"
            : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    </div>
  );
}
