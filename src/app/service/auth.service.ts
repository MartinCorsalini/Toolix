import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  estoyLogeado: boolean = false

  //Cuando llamas a logIn(), la variable estoyLogeado se establece en true
  // y se guarda un token en localStorage.
  //Esto asegura que el usuario siga autenticado incluso si recarga la página.
  logIn()
  {
    this.estoyLogeado = true;
    localStorage.setItem('token', '123.456'); // Guarda el token en localStorage
    console.log("Usuario logueado:", this.estoyLogeado); // Log para verificar que el usuario está logueado
  }

  //Cuando llamas a LogOut(), estoyLogeado se establece en false
  // y el token se elimina de localStorage.
  //Esto asegura que el usuario quede completamente desconectado.
  LogOut() {
    this.estoyLogeado = false;
    localStorage.removeItem('token'); // Elimina el token de localStorage al cerrar sesión
    console.log("Usuario deslogueado:", this.estoyLogeado); // Log para verificar que el usuario está deslogueado
  }

  // Método que verifica si el usuario está autenticado
  estaLogeado(): boolean
  {
    const isAuthenticated = this.estoyLogeado || !!localStorage.getItem('token');
    // Verifica si `estoyLogeado` es true o si hay un token en `localStorage`
    console.log("Verificación de autenticación:", isAuthenticated); // Log para mostrar el estado de autenticación actual
    return isAuthenticated;

  }

  // Chat gpt -------
  /*
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  login2() {
    // Tu lógica de login aquí
    this.isAuthenticated.next(true);
  }

  logout2() {
    // Tu lógica de logout aquí
    this.isAuthenticated.next(false);
  }

  checkAuthStatus() {
    // Verificar si hay un token en localStorage o similar
    const token = localStorage.getItem('token');
    this.isAuthenticated.next(!!token);
  }
    */
}
