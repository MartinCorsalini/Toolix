import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AltaBajaReservaComponent } from '../../Reservas/alta-baja-reserva/alta-baja-reserva.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AltaBajaReservaComponent, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() idTrabajador: number | undefined = undefined; // inicializa
  @Output() eventReserva= new EventEmitter<number>();

  reservar(): void{
    this.eventReserva.emit(this.idTrabajador) //emite el id del trabajador
    
  }


}
