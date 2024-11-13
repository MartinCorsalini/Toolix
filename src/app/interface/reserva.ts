

export interface Reserva {
    id: string,
    idTr: string | null,
    idUs:string | undefined,
    direccion: string,
    fecha: Date,
    hora:number,
    aceptada: boolean // aceptada true, rechazada false
}
