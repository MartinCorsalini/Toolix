import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  login() {
    // Tu lógica de login aquí
    this.isAuthenticated.next(true);
  }

  logout() {
    // Tu lógica de logout aquí
    this.isAuthenticated.next(false);
  }

  checkAuthStatus() {
    // Verificar si hay un token en localStorage o similar
    const token = localStorage.getItem('token');
    this.isAuthenticated.next(!!token);
  }
}
