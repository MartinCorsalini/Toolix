import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
}
