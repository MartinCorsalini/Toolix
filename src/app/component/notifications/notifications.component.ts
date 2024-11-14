import { Component, OnInit } from '@angular/core';
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";
import { Reserva } from '../../interface/reserva';
import { CommonModule } from '@angular/common';
import { AltaBajaReservaComponent } from "../Reservas/alta-baja-reserva/alta-baja-reserva.component";
import { ReservasService } from '../../service/reservas.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NavbarPrivateComponent, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  reservasEnviadas: Reserva[]=[];

  constructor(private reservasService: ReservasService, private router: Router) {}

  ngOnInit(): void {
    this.reservasService.cargarReservas();
    // Obtener las reservas enviadas
    this.reservasService.getReservas().subscribe({
      next: (reservas: Reserva[]) => {
        this.reservasEnviadas = reservas;
      }
      
    });
  }

  recibirEventReserva(reserva: Reserva){
      this.reservasEnviadas.push(reserva);

  }


  modificarReserva(reserva: Reserva){
    this.router.navigate([`/modificar-reserva`, reserva.id, reserva.idTr]);
  }
  
  eliminarReserva(id: string | null) {
    this.reservasService.deleteReserva(id).subscribe({
      next: () => {
        // Remueve la reserva de la lista local después de eliminarla en el servidor
        this.reservasEnviadas = this.reservasEnviadas.filter(r => r.id !== id);
        console.log("Reserva eliminada correctamente.");
      },
      error: (e) => {
        console.error("Error al eliminar la reserva:", e);
      }
    });
  }

}






