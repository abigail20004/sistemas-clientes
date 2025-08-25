import axios from "axios";

const API_URL = "http://localhost:5177/api"; 

export async function login(email: string, password: string) {
  const res = await axios.post(`${API_URL}/Auth/login`, {
    email,
    contrasenaHash: password
  });
  return res.data;
}

export async function registerCliente(data: any) {
  return axios.post(`${API_URL}/Auth/registro-cliente`, data);
}
