import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarPrivateComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}
