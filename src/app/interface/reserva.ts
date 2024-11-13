

export interface Reserva {
    id?: number,
    idTr: number,
    idUs:number,
    direccion: string,
    fecha: Date,
    hora:number,
    aceptada: boolean // aceptada true, rechazada false
}
