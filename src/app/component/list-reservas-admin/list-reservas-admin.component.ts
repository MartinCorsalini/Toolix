import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../../shared/navbar-admin/navbar-admin.component";
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { Reserva } from '../../interface/reserva';
import { AuthService } from '../../service/auth.service';
import { ReservasService } from '../../service/reservas.service';
import { DialogoComponent } from '../Inicio/cuadro-dialogo/cuadro-dialogo.component';

@Component({
  selector: 'app-list-reservas-admin',
  standalone: true,
  imports: [NavbarAdminComponent, CommonModule,RouterLink],
  templateUrl: './list-reservas-admin.component.html',
  styleUrl: './list-reservas-admin.component.css'
})
export class ListReservasAdminComponent {
  reservas: Reserva[]=[];

  constructor(private user : AuthService, private reservasService: ReservasService, private dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    this.cargarReservas();
    if (this.user.estaLogeado()) {
      this.reservasService.getReserva().subscribe((existente) => {
        this.reservas = existente;
      });
    } else {
      // Si no está logueado, redirige a la página de login
      this.router.navigate(['/login']);
    }
  }


 

  eliminarReserva(id: string | null ){
    this.reservasService.deleteReserva(id).subscribe(
      {
        next: () => {
          console.log('Eliminando');
          this.reservas = this.reservas.filter(res => res.id !== id);
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
        this.reservas = reservas; // Asigna las reservas obtenidas del servidor
      },
     error: (e : Error) => {
        console.log('Error al cargar las reservas', e.message);
      }
    }

    );
  } 

  irAModificarReserva(reserva: Reserva) {
    this.router.navigate(['/modificar-reserva-admin'], { state: { reserva } });
  }
}


