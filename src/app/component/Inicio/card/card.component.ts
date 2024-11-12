import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AltaBajaReservaComponent } from '../../../Reservas/alta-baja-reserva/alta-baja-reserva.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AltaBajaReservaComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() trabajador: any;
  @Output() eventReserva= new EventEmitter<number>();

  reservar(): void{
    this.eventReserva.emit(this.trabajador.id) //emite el id del trabajador
    
  }


}
