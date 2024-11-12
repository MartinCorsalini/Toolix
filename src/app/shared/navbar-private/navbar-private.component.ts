import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-private',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar-private.component.html',
  styleUrl: './navbar-private.component.css'
})
export class NavbarPrivateComponent {
  logoUrl: string = 'assets/images/logo.jpeg';

  isProfileOpen = false;
  route = inject(Router)

  constructor(private router: Router) {}

  openDropdown() {
    this.isProfileOpen = true;
  }

  closeDropdown() {
    this.isProfileOpen = false;
  }

  logout() {
    console.log('Cerrar sesión');
    this.closeDropdown();
    this.router.navigate(['/login']);
  }


  irADetalles(id:string)
  {
    this.route.navigate([`detalles/${id}`]);
  }
}
