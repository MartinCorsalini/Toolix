import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //-------------------MANEJO DEL USER ID --------------------
  idUsuario = new BehaviorSubject<string | null>(null);
  currentUserId$ = this.idUsuario.asObservable();
  //----------------------------------------------------------

  estoyLogeado: boolean = false

  //Cuando llamas a logIn(), la variable estoyLogeado se establece en true
  // y se guarda un token en localStorage.
  //Esto asegura que el usuario siga autenticado incluso si recarga la página.
  logIn(userId: string)
  {
    this.estoyLogeado = true;
    this.idUsuario.next(userId);

    localStorage.setItem('token', '123.456'); // Guarda el token en localStorage
    localStorage.setItem('userId', userId); // Guarda el userId en localStorage

    console.log("Usuario logueado:", this.estoyLogeado); // Log para verificar que el usuario está logueado
    console.log("User ID guardado:", userId);
  }

  //Cuando llamas a LogOut(), estoyLogeado se establece en false
  // y el token se elimina de localStorage.
  //Esto asegura que el usuario quede completamente desconectado.
  LogOut() {
    this.estoyLogeado = false;
    this.idUsuario.next(null);

    localStorage.removeItem('token'); // Elimina el token de localStorage al cerrar sesión
    localStorage.removeItem('userId'); // Elimina el userId de localStorage

    console.log("Usuario deslogueado:", this.estoyLogeado); // Log para verificar que el usuario está deslogueado
  }

  // Método que verifica si el usuario está autenticado
  estaLogeado(): boolean
  {
    const isAuthenticated = this.estoyLogeado || !!localStorage.getItem('token');
    // Verifica si `estoyLogeado` es true o si hay un token en `localStorage`
    console.log("Verificación de autenticación:", isAuthenticated); // Log para mostrar el estado de autenticación actual
   // Si el usuario tiene un token en localStorage, también recuperamos el userId

    if (isAuthenticated && !this.idUsuario.getValue()) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.idUsuario.next(storedUserId); // Recupera el userId almacenado
      }
    }

    return isAuthenticated;

  }


  // Método para obtener el ID actual del usuario
  getUserId(): string | null {
    return this.idUsuario.getValue();
  }




}
