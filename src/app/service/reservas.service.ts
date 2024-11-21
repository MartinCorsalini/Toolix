import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../interface/reserva';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  urlBase: string = "http://localhost:3000/reservas"
  constructor(
    private http:HttpClient,
    private authService: AuthService
  ) { }

  private reservasSubject = new BehaviorSubject<Reserva[]>([]);
  reservasSer = this.reservasSubject.asObservable();

  ////// Funciones Notificaciones /  Alta Baja

  cargarReservas(): void {
    const userId = this.authService.getUserId();  // Obtenemos el ID del usuario logueado

    if (!userId) {
      console.log("No hay usuario logueado.");
      return;  // Si no hay usuario logueado, no hacemos nada
    }

    // Hacemos la solicitud GET para obtener las reservas
    this.http.get<Reserva[]>(this.urlBase).subscribe((reservas) => {
      // Filtramos las reservas según el ID del usuario logueado
      const reservasFiltradas = reservas.filter(reserva => reserva.idUs === userId);
      this.reservasSubject.next(reservasFiltradas);  // Actualizamos el estado con las reservas filtradas
    });
  }

  agregarReserva(reserva: Reserva) {
    const reservas = this.reservasSubject.getValue();
    reservas.push(reserva);
    this.reservasSubject.next(reservas); // Actualiza la lista de reservas
  }

  obtenerReservas(): Observable<Reserva[]> {
    return this.reservasSer;
  }

  getUserRole(): string | undefined {
    return this.authService.getUserRole();
  }

  //////// peticiones http client
  getReserva(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlBase);
  }
  

  getReservaById(id:string): Observable<Reserva>{
    return this.http.get<Reserva>(`${this.urlBase}/${id}`);

  }

  postReserva(reserva:Reserva): Observable<Reserva>{
    return this.http.post<Reserva>(this.urlBase, reserva);
 }
      
 putReserva(reserva:Reserva, id:string | null): Observable<Reserva>{
  return this.http.put<Reserva>(`${this.urlBase}/${id}`,reserva);
}

deleteReserva(id:string | null): Observable<void>{
  return this.http.delete<void>(`${this.urlBase}/${id}`);

}

calificarReserva(id: string, calificacion: number): Observable<void> {
  const url = `${this.urlBase}/${id}/calificar`;
  return this.http.put<void>(url, { calificacion });
}

  
}
