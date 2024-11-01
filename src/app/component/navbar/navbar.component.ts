import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logoUrl: string = 'assets/images/logo.jpeg';

  constructor(private router: Router) {}  // Inyecta Router

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  registrarse() {
    this.router.navigate(['/olvidaste-contrasenia']);
  }
}
