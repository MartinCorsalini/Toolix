export interface Usuario {
    id?: string,
    nombre: string,
    email: string,
    password: string,
    rol: string,
    calificaciones?: number[],
    valoracion?: number,
    profesion?: string,
    disponibilidad?: string,
    zona?: string,
    descripcion?: string,
}
