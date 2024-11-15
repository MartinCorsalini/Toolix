import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarAdminComponent } from "../../shared/navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-nosotros-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarAdminComponent],
  templateUrl: './nosotros-admin.component.html',
  styleUrl: './nosotros-admin.component.css'
})
export class NosotrosAdminComponent {
  avatarMujer: string = 'assets/avatar/mujer.png';
  avatarHombre: string = 'assets/avatar/hombre.png';

}