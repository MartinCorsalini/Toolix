import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";
import { Reserva } from '../../interface/reserva';
import { CommonModule } from '@angular/common';
import { AltaBajaReservaComponent } from "../Reservas/alta-baja-reserva/alta-baja-reserva.component";
import { ReservasService } from '../../service/reservas.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NavbarPrivateComponent, CommonModule, AltaBajaReservaComponent,RouterModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
   // Arreglos para almacenar reservas enviadas y recibidas por el usuario
  reservasEnviadas: Reserva[]=[];
  reservasRecibidas: Reserva[]=[];
  esTrabajador: boolean = false;// Estado que indica si el usuario tiene rol de "Trabajador"

  // Estado que indica si el usuario tiene rol de "Trabajador"
  constructor(
    private user : AuthService,
    private reservasService: ReservasService,
    private dialog: MatDialog, // manejo de diálogos
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.user.estaLogeado())
      { // Si el usuario está autenticado, obtiene sus reservas

      this.reservasService.getReserva().subscribe((reservas) => {
        const userId = this.user.getUserId();

         // Filtra reservas enviadas y recibidas en base al id del usuario
        this.reservasEnviadas = reservas.filter((res) => res.idUs === userId);
        this.reservasRecibidas = reservas.filter((res) => res.idTr === userId);
      });

      // Recupera el rol del usuario y ajusta `esTrabajador` según corresponda
      this.esTrabajador = this.user.getUserRole() === 'Trabajador';
    } else {
      // Si no está logueado, redirige a la página de login
      this.router.navigate(['/login']);
    }
  }


  irAModificarReserva(reserva: Reserva){

    this.router.navigate(['modificar-reserva', reserva.id,reserva.idTr]);

  }

  eliminarReserva(id: string | null ){
    this.reservasService.deleteReserva(id).subscribe(
      {
        next: () => {
          console.log('Eliminando');
           this.reservasEnviadas = this.reservasEnviadas.filter(res => res.id !== id);
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: "La reserva se ha eliminado correctamente"
            }
          });
        },
        error: (e: Error) => {
          console.log('Fallo eliminar');
        }
        });

  }

  cargarReservas() {
    this.reservasService.getReserva().subscribe({
      next: (reservas: Reserva[]) => {
        this.reservasEnviadas = reservas; // Asigna las reservas obtenidas del servidor
      },
     error: (e : Error) => {
        console.log('Error al cargar las reservas', e.message);
      }
    }
    );
  }

 // Aceptar una reserva
 aceptarReserva(reserva: Reserva) {
  reserva.estado = 'aceptada'; // Cambia el estado a "aceptada"
  this.reservasService.putReserva(reserva, reserva.id).subscribe({
    next: () => {
      this.dialog.open(DialogoComponent, {
        panelClass: "custom-dialog-container",
        data: { message: "Reserva aceptada correctamente" }
      });
    },
    error: (e: Error) => {
      console.log('Error al aceptar la reserva');
    }
  });
}

// Rechazar una reserva
rechazarReserva(reserva: Reserva) {
  reserva.estado = 'rechazada'; // Cambia el estado a "rechazada"
  this.reservasService.putReserva(reserva, reserva.id).subscribe({
    next: () => {
      this.dialog.open(DialogoComponent, {
        panelClass: "custom-dialog-container",
        data: { message: "Reserva rechazada correctamente" }
      });
      //this.reservasRecibidas = this.reservasRecibidas.filter(res => res.id !== reserva.id);
    },
    error: (e: Error) => {
      console.log('Error al rechazar la reserva');
    }
  });
}

}





