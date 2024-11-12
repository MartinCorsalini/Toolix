import { Component } from '@angular/core';
import { AltaBajaReservaComponent } from '../../component/Reservas/alta-baja-reserva/alta-baja-reserva.component';

@Component({
  selector: 'app-alta-baja-page',
  standalone: true,
  imports: [AltaBajaReservaComponent],
  templateUrl: './alta-baja-page.component.html',
  styleUrl: './alta-baja-page.component.css'
})
export class AltaBajaPageComponent {

}
