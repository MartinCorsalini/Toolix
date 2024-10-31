import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logoUrl: string = 'assets/images/logo.jpeg';

  iniciarSesion() {
    // Lógica para iniciar sesión
  }

  registrarse() {
    // Lógica para registrarse
  }
}
