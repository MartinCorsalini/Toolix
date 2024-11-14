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
  reservasEnviadas: Reserva[]=[];
  reservasRecibidas: Reserva[]=[];
  esTrabajador: boolean = false;

  constructor(private user : AuthService, private reservasService: ReservasService, private dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    if (this.user.estaLogeado()) {
      // Obtiene reservas después de que se cargue el usuario
      this.reservasService.getReserva().subscribe((reservas) => {
        const userId = this.user.getUserId();
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

  recibirEventReserva(reserva: Reserva){
      this.reservasEnviadas.push(reserva);

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


}

