import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { Compra } from "./ComprasList";

interface CompraFormProps {
  usuarioId: number;
  onCompraAgregada?: (compra: Compra) => void;
}

interface FormData {
  producto: string;
  monto: number;
}

export const CompraForm: React.FC<CompraFormProps> = ({ usuarioId, onCompraAgregada }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post<Compra>(`/compras/${usuarioId}`, data);
      alert("Compra registrada correctamente!");
      reset();
      if (onCompraAgregada) onCompraAgregada(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al registrar la compra");
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Registrar nueva compra</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label>Producto</label>
          <input type="text" className="form-control" {...register("producto", { required: true })} />
        </div>
        <div className="mb-2">
          <label>Monto</label>
          <input type="number" step="0.01" className="form-control" {...register("monto", { required: true, min: 0 })} />
        </div>
        <button className="btn btn-success">Registrar Compra</button>
      </form>
    </div>
  );
};
