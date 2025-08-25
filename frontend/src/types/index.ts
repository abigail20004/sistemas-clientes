export interface Usuario {
    nombre: string;
    email: string;
    telefono: string;
    rol?: string;
    compras?: Compra[];
}

export interface Compra {
    id: number;
    producto: string;
    monto: number;
    fechaCompra: string;
}
