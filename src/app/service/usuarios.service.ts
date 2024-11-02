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

  loginUsuario(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBase}/login`, { email, password });
  }

  postUsuarios(usuario:Usuario): Observable<Usuario>{
     return this.http.post<Usuario>(this.urlBase,usuario);
  }


}
