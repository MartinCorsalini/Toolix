import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlBase: string = "http://localhost:3000/usuarios"
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlBase);
  }

  getUsuarioByEmailAndPassword(email: string, password: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlBase}?email=${email}&password=${password}`);
  }

  loginUsuario(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBase}/login`, { email, password });
  }

  postUsuarios(usuario:Usuario): Observable<Usuario>{
     return this.http.post<Usuario>(this.urlBase ,usuario);
  }

  getUsuarioById(id: string | null): Observable<Usuario>
  {
    return this.http.get<Usuario>(`${this.urlBase}/${id}`);
  }

 deletePiloto(id: string): Observable<void>
 {
   return this.http.delete<void>(`${this.urlBase}/${id}`);
 }

 putPiloto(usuario: Usuario, id: string | null): Observable<Usuario>
 {
   return this.http.put<Usuario>(`${this.urlBase}/${id}`, usuario);
 }

 getUsuarioByEmail(email: string | null): Observable<Usuario[]> {
  // Verifica que el email no sea null antes de hacer la solicitud
  if (!email) {
    throw new Error("El email no puede ser null");
  }

  return this.http.get<Usuario[]>(`${this.urlBase}?email=${encodeURIComponent(email)}`);
}

  putUsuario(usuario:Usuario, id:string): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlBase}/${id}`,usuario);
  }

  deleteUsuario(id:string): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  
  }
    
}
