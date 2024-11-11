import { Component } from '@angular/core';
import { AltaBajaReservaComponent } from '../../../Reservas/alta-baja-reserva/alta-baja-reserva.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AltaBajaReservaComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {


}
