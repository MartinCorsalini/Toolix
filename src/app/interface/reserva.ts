import { Time } from "@angular/common";


export interface Reserva {
    id: string | null ,
    idTr: string | null,
    idUs:string | undefined,
    direccion: string,
    fecha: Date,
    horario:Time,
    estado: 'aceptada' | 'rechazada' | 'pendiente' | 'finalizada',
    calificada: boolean; // Si es true, no va a mostrar el boton
}
