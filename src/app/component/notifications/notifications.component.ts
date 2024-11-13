import { Component, OnInit } from '@angular/core';
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";
import { Reserva } from '../../interface/reserva';
import { CommonModule } from '@angular/common';
import { AltaBajaReservaComponent } from "../Reservas/alta-baja-reserva/alta-baja-reserva.component";
import { ReservasService } from '../../service/reservas.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NavbarPrivateComponent, CommonModule, AltaBajaReservaComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  reservasEnviadas: Reserva[]=[];

  constructor(private reservasService: ReservasService) {}
  
  ngOnInit(): void {
    // Obtener las reservas enviadas
    this.reservasService.obtenerReservas().subscribe((reservas) => {
      this.reservasEnviadas = reservas;
    });
  }

  recibirEventReserva(reserva: Reserva){
      this.reservasEnviadas.push(reserva);
     
  }
 

  modificarReserva(reserva: Reserva){

  }
  eliminarReserva(reserva: Reserva){

  }

  }

  




