import { Reserva } from "./reserva";

export interface Usuario {
    id?: string,
    nombre: string,
    email: string,
    password: string,
    rol: string,
    reservas?: Reserva[],

    calificaciones?: number[],
    valoracion?: number,
    profesion?: string,
    disponibilidad?: string,
    zona?: string,
    descripcion?: string,
    telefono?: string

}
