import { Time } from "@angular/common";


export interface Reserva {
    id: string | null ,
    idTr: string | null,
    idUs:string | undefined,
    direccion: string,
    fecha: Date,
    horario:Time,
    aceptada: boolean // aceptada true, rechazada false
}
