import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";
import { Reserva } from '../../interface/reserva';
import { CommonModule } from '@angular/common';
import { AltaBajaReservaComponent } from "../Reservas/alta-baja-reserva/alta-baja-reserva.component";
import { ReservasService } from '../../service/reservas.service';
<<<<<<< HEAD
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { Router, RouterModule } from '@angular/router';
=======
import { Router, RouterLink } from '@angular/router';
>>>>>>> a539ce735c277d5afafb3ccff55dceac06f71eb6

@Component({
  selector: 'app-notifications',
  standalone: true,
<<<<<<< HEAD
  imports: [NavbarPrivateComponent, CommonModule, AltaBajaReservaComponent,RouterModule],
=======
  imports: [NavbarPrivateComponent, CommonModule],
>>>>>>> a539ce735c277d5afafb3ccff55dceac06f71eb6
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  reservasEnviadas: Reserva[]=[];
<<<<<<< HEAD
  
  constructor(private reservasService: ReservasService,private dialog: MatDialog,private router: Router) {}
  
  ngOnInit(): void {
    this.reservasService.cargarReservas();
    // Obtener las reservas enviadas
    this.reservasService.getReserva().subscribe((reservas) => {
      this.reservasEnviadas = reservas

  
=======

  constructor(private reservasService: ReservasService, private router: Router) {}

  ngOnInit(): void {
    this.reservasService.cargarReservas();
    // Obtener las reservas enviadas
    this.reservasService.getReservas().subscribe({
      next: (reservas: Reserva[]) => {
        this.reservasEnviadas = reservas;
      }
      
>>>>>>> a539ce735c277d5afafb3ccff55dceac06f71eb6
    });
  }

  recibirEventReserva(reserva: Reserva){
      this.reservasEnviadas.push(reserva);

  }


<<<<<<< HEAD

  irAModificarReserva(reserva: Reserva){
    
    this.router.navigate(['modificar-reserva', reserva.id,reserva.idTr]);

    
  }

  eliminarReserva(id: string | null ){
    this.reservasService.deleteReserva(id).subscribe(
      {
        next: () => {
          console.log('Eliminando');
          this.cargarReservas();
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


  }

=======
  modificarReserva(reserva: Reserva){
    this.router.navigate([`/modificar-reserva`, reserva.id, reserva.idTr]);
  }
>>>>>>> a539ce735c277d5afafb3ccff55dceac06f71eb6
  
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





