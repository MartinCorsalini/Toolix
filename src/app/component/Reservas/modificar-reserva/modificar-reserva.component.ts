import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservasService } from '../../../service/reservas.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../service/auth.service';
import { Reserva } from '../../../interface/reserva';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';

@Component({
  selector: 'app-modificar-reserva',
  standalone: true,
  imports: [NavbarPrivateComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './modificar-reserva.component.html',
  styleUrl: './modificar-reserva.component.css'
})
export class ModificarReservaComponent implements OnInit {
  modificarRForm!: FormGroup;
  reservaId: string | null = null;
  trabajadorId: string | null = null;
  fechaMinima: string = '';
  caracteresRestantes: number = 50; // Límite máximo de caracteres

  @Output()
  eventReservaModificada = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private rs: ReservasService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Establece la fecha mínima como la fecha actual
    this.fechaMinima = this.obtenerFechaActualFormateada();

    this.route.paramMap.subscribe({
      next: (param) => {
        this.reservaId = param.get('id');
        this.trabajadorId = param.get('trabajadorId');
      },
      error: (e: Error) => {
        console.log("Error: ", e.message);
      }
    });

    this.modificarRForm = this.fb.nonNullable.group({
      fecha: ['', [
        Validators.required, 
        this.fechaFuturaValidator
      ]],
      horario: ['', [
        Validators.required,
        this.horarioValidator
      ]],
      direccion: ['', Validators.required],
      descProblema: ['', [Validators.required, Validators.maxLength(50)]],
      estado: ['pendiente']
    });

    this.reservaId = this.route.snapshot.paramMap.get('id');

    if (this.reservaId) {
      this.cargarDatosReserva(this.reservaId);
    }

    // Inicializar el contador basado en el valor inicial
    this.actualizarContador();
  }

  // Método para obtener la fecha actual en formato YYYY-MM-DD
  private obtenerFechaActualFormateada(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  // Validador personalizado para asegurar que la fecha sea en el futuro
  fechaFuturaValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) return null;

    const fechaSeleccionada = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);  // Resetear horas para comparación precisa

    return fechaSeleccionada <= hoy ? { 'fechaPasada': true } : null;
  }

  // Validador personalizado para horario
  horarioValidator(control: AbstractControl): {[key: string]: any} | null {
    const fechaControl = control.parent?.get('fecha');
    
    if (!control.value || !fechaControl) return null;

    const fechaSeleccionada = new Date(fechaControl.value);
    const hoy = new Date();

    // Si la fecha seleccionada es hoy
    if (this.esMismaFecha(fechaSeleccionada, hoy)) {
      const [horaSeleccionada, minutosSeleccionados] = control.value.split(':').map(Number);
      const horaActual = hoy.getHours();
      const minutosActuales = hoy.getMinutes();

      // Validar que el horario no sea anterior a la hora actual
      if (horaSeleccionada < horaActual || 
          (horaSeleccionada === horaActual && minutosSeleccionados < minutosActuales)) {
        return { 'horarioPasado': true };
      }
    }

    return null;
  }

  // Método auxiliar para comparar fechas
  private esMismaFecha(fecha1: Date, fecha2: Date): boolean {
    return fecha1.getFullYear() === fecha2.getFullYear() &&
           fecha1.getMonth() === fecha2.getMonth() &&
           fecha1.getDate() === fecha2.getDate();
  }

  actualizarContador(): void {
    const descProblemaControl = this.modificarRForm.get('descProblema');
    if (descProblemaControl) {
      const textoActual = descProblemaControl.value || '';
      this.caracteresRestantes = 50 - textoActual.length;
    }
  }

  cargarDatosReserva(id: string): void {
    this.rs.getReservaById(id).subscribe({
      next: (reserva: Reserva) => {
        this.modificarRForm.patchValue({
          fecha: reserva.fecha,
          horario: reserva.horario,
          direccion: reserva.direccion
        });
      },
      error: (e: Error) => {
        console.log("Error al cargar los datos:", e.message);
      }
    });
  }

  modificarReserva(): void {
    // Añadimos una línea para marcar todos los campos como tocados
    if (this.modificarRForm.invalid) {
      this.modificarRForm.markAllAsTouched();
      return;
    }

    const reservaModificada = {
      ...this.modificarRForm.getRawValue(),
      id: this.reservaId,
      idTr: this.trabajadorId,
      idUs: this.authService.getUserId()
    };

    this.rs.putReserva(reservaModificada, this.reservaId).subscribe({
      next: (reservaModificada: Reserva) => {
        console.log("Reserva modificada correctamente:", reservaModificada);
        this.dialog.open(DialogoComponent, {
          panelClass: "custom-dialog-container",
          data: {
            message: 'Se ha modificado la reserva exitosamente.\n🎉¡Muchas gracias por su confianza! 🎉'
          }
        });
        this.eventReservaModificada.emit();
        this.router.navigate(['/notificaciones']);
      },
      error: (e: Error) => {
        console.log("Error al modificar la reserva:", e.message);
        this.dialog.open(DialogoComponent, {
          panelClass: "custom-dialog-container",
          data: {
            message: 'Ocurrió un error al modificar la reserva. Por favor, corrobore los datos ingresados.'
          }
        });
      }
    });
  }
}