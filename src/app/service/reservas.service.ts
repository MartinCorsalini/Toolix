import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../interface/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  urlBase: string = "http://localhost:4000/reservas"
  constructor(private http:HttpClient) { }


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
