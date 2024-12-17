import { Component } from '@angular/core';
import { FavoritosComponent } from '../../component/favoritos/favoritos.component';
import { NavbarPrivateComponent } from '../../shared/navbar-private/navbar-private.component';

@Component({
  selector: 'app-favoritos-page',
  standalone: true,
  imports: [FavoritosComponent, NavbarPrivateComponent],
  templateUrl: './favoritos-page.component.html',
  styleUrl: './favoritos-page.component.css'
})
export class FavoritosPageComponent {

}
