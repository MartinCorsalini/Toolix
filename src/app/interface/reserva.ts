export interface Reserva {
    id: string | null ,
    idTr: string | null,
    idUs:string | undefined,
    direccion: string,
    fecha: Date,
    horario:number,
    aceptada: boolean // aceptada true, rechazada false
}
