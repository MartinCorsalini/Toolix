import { Reserva } from "./reserva";

export interface Usuario {
    id?: string | null,
    nombre: string,
    email: string,
    password: string,
    rol : string,
    reservas?: Reserva[],

    valoraciones?: number[],
    valoracion?: number,
    profesion?: string,
    disponibilidad?: string,
    zona?: string,
    descripcion?: string,
    telefono?: string

}
