import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode; // usamos ReactNode en lugar de JSX.Element
  role: string;
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { token, role: userRole } = useAuth();

  if (!token) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }

  if (userRole !== role) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }

  return <>{children}</>; // Fragmento mínimo para ReactNode
}
