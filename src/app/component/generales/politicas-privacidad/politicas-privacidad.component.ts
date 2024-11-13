import { Component } from '@angular/core';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politicas-privacidad',
  standalone: true,
  imports: [NavbarPrivateComponent,RouterLink],
  templateUrl: './politicas-privacidad.component.html',
  styleUrl: './politicas-privacidad.component.css'
})
export class PoliticasPrivacidadComponent {

}
