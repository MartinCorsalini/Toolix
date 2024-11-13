import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../interface/reserva';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  urlBase: string = "http://localhost:3000/reservas"
  constructor(private http:HttpClient) { }

  private reservasSubject = new BehaviorSubject<Reserva[]>([]);
  reservasSer = this.reservasSubject.asObservable();

  ////// Funciones Notificaciones /  Alta Baja

  agregarReserva(reserva: Reserva) {
    const reservas = this.reservasSubject.getValue();
    reservas.push(reserva);
    this.reservasSubject.next(reservas); // Actualiza la lista de reservas
  }

  obtenerReservas(): Observable<Reserva[]> {
    return this.reservasSer;
  }


  //////// peticiones http client
  getReserva(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlBase);
  }
  
  getReservaById(id:number): Observable<Reserva>{
    return this.http.get<Reserva>(`${this.urlBase}/${id}`);

  }

  postReserva(reserva:Reserva): Observable<Reserva>{
    return this.http.post<Reserva>(this.urlBase, reserva);
 }
      
  

 putReserva(reserva:Reserva, id:number): Observable<Reserva>{
  return this.http.put<Reserva>(`${this.urlBase}/${id}`,reserva);
}

deleteReserva(id:number): Observable<void>{
  return this.http.delete<void>(`${this.urlBase}/${id}`);

}
  
}
