// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClienteDashboard from "./pages/ClienteDashboard";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
                
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ClienteDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
