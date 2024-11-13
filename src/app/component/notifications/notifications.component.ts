import { Component, OnInit } from '@angular/core';
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";
import { Reserva } from '../../interface/reserva';
import { CommonModule } from '@angular/common';
import { AltaBajaReservaComponent } from "../Reservas/alta-baja-reserva/alta-baja-reserva.component";
import { ReservasService } from '../../service/reservas.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../Inicio/cuadro-dialogo/cuadro-dialogo.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NavbarPrivateComponent, CommonModule, AltaBajaReservaComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  reservasEnviadas: Reserva[]=[];

  constructor(private reservasService: ReservasService,private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.reservasService.cargarReservas();
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

  eliminarReserva(id: string){
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
    this.reservasService.getReserva().subscribe(
      (reservas: Reserva[]) => {
        this.reservasEnviadas = reservas; // Asigna las reservas obtenidas del servidor
      },
      (error) => {
        console.log('Error al cargar las reservas', error);
      }
    );
  }


  }

  




