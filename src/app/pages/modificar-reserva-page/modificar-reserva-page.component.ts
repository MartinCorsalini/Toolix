import { Component } from '@angular/core';
import { ModificarReservaComponent } from '../../component/Reservas/modificar-reserva/modificar-reserva.component';

@Component({
  selector: 'app-modificar-reserva-page',
  standalone: true,
  imports: [ModificarReservaComponent],
  templateUrl: './modificar-reserva-page.component.html',
  styleUrl: './modificar-reserva-page.component.css'
})
export class ModificarReservaPageComponent {

}
