import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-private',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-private.component.html',
  styleUrl: './navbar-private.component.css'
})
export class NavbarPrivateComponent {
  logoUrl: string = 'assets/images/logo.jpeg';

  /*
  constructor(private router: Router) {}  // Inyecta Router

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  registrarse() {
    this.router.navigate(['/login']);
  }
    */
}
