import { Component } from '@angular/core';
import { ContactoComponent } from "../../../component/generales/contacto/contacto.component";

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [ContactoComponent],
  templateUrl: './contacto-page.component.html',
  styleUrl: './contacto-page.component.css'
})
export class ContactoPageComponent {

}
