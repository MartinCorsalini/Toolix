import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../Inicio/card/card.component';
import { Reserva } from '../../../interface/reserva';
import { ReservasService } from '../../../service/reservas.service';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { AuthService } from '../../../service/auth.service';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../service/usuarios.service';

@Component({
  selector: 'app-alta-baja-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarPrivateComponent, RouterLink],
  templateUrl: './alta-baja-reserva.component.html',
  styleUrl: './alta-baja-reserva.component.css'
})
export class AltaBajaReservaComponent implements OnInit {
  reservaForm!: FormGroup;
  listaReservas: Reserva[] = [];
  closeDialog: any;
  dialogRef: any;
  usuarioActualId: string | undefined = undefined;
  trabajadorId: string | null = null;
  fechaMinima: string;

  constructor(
    private fb: FormBuilder,
    private rs: ReservasService,
    private dialog: MatDialog,
    private authService: AuthService,
    private route: ActivatedRoute,
    private reservasService: ReservasService
  ) {
    // Establece la fecha mínima como la fecha actual
    const today = new Date();
    this.fechaMinima = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.usuarioActualId = this.authService.getUserId();
    this.trabajadorId = this.route.snapshot.paramMap.get('id');

    this.reservaForm = this.fb.group({
      fecha: ['', [
        Validators.required,
        this.validarFechaFutura
      ]],
      horario: ['', [
        Validators.required,
        this.validarHorarioActual.bind(this)
      ]],
      direccion: ['', Validators.required],
      descProblema: ['', Validators.required],
      estado: ['pendiente'] 
    });

    // Actualizar validación de horario cuando cambia la fecha
    this.reservaForm.get('fecha')?.valueChanges.subscribe(() => {
      this.reservaForm.get('horario')?.updateValueAndValidity();
    });
  }

  // Validación personalizada para fechas
  validarFechaFutura(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Si no hay valor, la validación required se encargará
    }

    const fechaSeleccionada = new Date(control.value);
    const fechaActual = new Date();

    // Elimina la hora de la comparación
    fechaActual.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    // Valida que la fecha no sea anterior a la fecha actual
    if (fechaSeleccionada < fechaActual) {
      return { fechaInvalida: true };
    }

    return null;
  }

  // Validación personalizada para horario actual
  validarHorarioActual(control: AbstractControl): ValidationErrors | null {
    const fechaSeleccionada = this.reservaForm?.get('fecha')?.value;
    const horarioSeleccionado = control.value;

    if (!fechaSeleccionada || !horarioSeleccionado) {
      return null; // Si no hay fecha u horario, no validamos
    }

    const fechaActual = new Date();
    const fechaSeleccionadaDate = new Date(fechaSeleccionada);
    
    // Limpiar horas, minutos, segundos y milisegundos
    fechaActual.setHours(0, 0, 0, 0);
    fechaSeleccionadaDate.setHours(0, 0, 0, 0);

    // Si la fecha seleccionada es hoy, validamos el horario
    if (fechaSeleccionadaDate.getTime() === fechaActual.getTime()) {
      const horaActual = new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
      
      // Comparamos si el horario seleccionado es menor que la hora actual
      if (horarioSeleccionado < horaActual) {
        return { horarioPasado: true };
      }
    }

    return null;
  }

  addReserva() {
    // Marcar todos los campos como tocados
    Object.keys(this.reservaForm.controls).forEach(key => {
      const control = this.reservaForm.get(key);
      control?.markAsTouched();
    });

    // Verificar si el formulario es válido antes de proceder
    if (this.reservaForm.invalid) {
      return;
    }

    // Obtener los valores del formulario
    const reserva = this.reservaForm.value;
    
    // Llamar a los métodos de reserva
    this.addReservaDB(reserva);
    this.reservasService.agregarReserva(reserva);
  }

  addReservaDB(reserva: Reserva) {
    // Asignar IDs de usuario y trabajador
    reserva.idUs = this.usuarioActualId;
    reserva.idTr = this.trabajadorId;

    // Realizar la reserva
    this.rs.postReserva(reserva).subscribe({
      next: (reservaRespuesta: Reserva) => {
        console.log("Reserva realizada correctamente:", reservaRespuesta);
        this.dialog.open(DialogoComponent, {
          panelClass: "custom-dialog-container",
          data: {
            message: 'Se ha realizado la reserva exitosamente.\n🎉¡Muchas gracias por su confianza! 🎉'
          }
        });
      },
      error: (e: Error) => {
        console.log("Error al realizar la reserva:", e.message);
        this.dialog.open(DialogoComponent, {
          panelClass: "custom-dialog-container",
          data: {
            message: 'Ocurrió un error al realizar la reserva. Por favor, corrobore los datos ingresados.'
          }
        });
      }
    });
  }

  closeDialogR(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }
}