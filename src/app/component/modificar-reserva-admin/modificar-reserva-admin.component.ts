import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Reserva } from '../../interface/reserva';
import { AuthService } from '../../service/auth.service';
import { ReservasService } from '../../service/reservas.service';
import { DialogoComponent } from '../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { NavbarAdminComponent } from "../../shared/navbar-admin/navbar-admin.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modificar-reserva-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarAdminComponent, CommonModule, RouterLink],
  templateUrl: './modificar-reserva-admin.component.html',
  styleUrls: ['./modificar-reserva-admin.component.css']
})
export class ModificarReservaAdminComponent implements OnInit {
  modificarRForm!: FormGroup;
  reserva: Reserva | null = null;
  reservaId: string | null = null;

  @Output()
  eventReservaModificada = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private rs: ReservasService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Obtiene el ID de la reserva desde la ruta
    this.reservaId = this.route.snapshot.paramMap.get('id'); // Usamos snapshot para obtener el ID de la ruta

    if (this.reservaId) {
      // Si tenemos el ID, cargamos los datos de la reserva
      this.cargarDatosReserva(this.reservaId);
    }

    // Inicializa el formulario con las validaciones necesarias
    this.modificarRForm = this.fb.group({
      fecha: ['', Validators.required],
      horario: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  cargarDatosReserva(id: string): void {
    // Obtiene la reserva por ID para cargar sus datos
    this.rs.getReservaById(id).subscribe({
      next: (reserva: Reserva) => {
        this.reserva = reserva;
        // Pone los valores de la reserva en el formulario
        this.modificarRForm.patchValue({
          fecha: reserva.fecha,
          horario: reserva.horario,
          direccion: reserva.direccion
        });
      },
      error: (e: Error) => {
        console.log("Error al cargar los datos de la reserva:", e.message);
      }
    });
  }

  modificarReserva(): void {
    if (this.modificarRForm.invalid) return;

    // Crea el objeto para actualizar la reserva
    const reservaModificada: Reserva = {
      ...this.modificarRForm.getRawValue(),
      id: this.reservaId,
      idTr: this.reserva?.idTr,
      idUs: this.reserva?.idUs
    };

    // Llama al servicio para actualizar la reserva
    this.rs.putReserva(reservaModificada, this.reservaId).subscribe(
      {
        next: (reservaModificada: Reserva) => {
          console.log("Reserva modificada correctamente:", reservaModificada);
          // Muestra el diálogo de éxito
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Se ha modificado la reserva exitosamente.\n🎉¡Muchas gracias por su confianza! 🎉'
            }
          });
          // Emite el evento para que el componente padre sepa que la reserva ha sido modificada
          this.eventReservaModificada.emit();
          // Redirige a la lista de reservas
          this.router.navigate(['/lista-reservas-admin']);
        },

        error: (e: Error) => {
          console.log("Error al modificar la reserva:", e.message);
          // Muestra el diálogo de error
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Ocurrió un error al modificar la reserva. Por favor, corrobore los datos ingresados.'
            }
          });
        }
      }
    );
  }
}