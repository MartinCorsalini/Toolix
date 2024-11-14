import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
<<<<<<< HEAD
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservasService } from '../../../service/reservas.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../service/auth.service';
import { Reserva } from '../../../interface/reserva';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';
=======
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Reserva } from '../../../interface/reserva';
import { ReservasService } from '../../../service/reservas.service';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { NavbarPrivateComponent } from '../../../shared/navbar-private/navbar-private.component';
import { CommonModule } from '@angular/common';
>>>>>>> a539ce735c277d5afafb3ccff55dceac06f71eb6

@Component({
  selector: 'app-modificar-reserva',
  standalone: true,
<<<<<<< HEAD
  imports: [NavbarPrivateComponent,ReactiveFormsModule, CommonModule,RouterLink],
=======
  imports: [NavbarPrivateComponent, CommonModule, RouterLink, ReactiveFormsModule],
>>>>>>> a539ce735c277d5afafb3ccff55dceac06f71eb6
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.css']
})
export class ModificarReservaComponent implements OnInit {
<<<<<<< HEAD
  modificarRForm!: FormGroup;
  reservaId: string | null = null;
  trabajadorId: string | null = null;


  @Output()
  eventReservaModificada = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private rs: ReservasService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}
=======
  reservaForm!: FormGroup;
  reservaId: string | null = null;
  trabajadorId: string | null = null;

  @Output()
  reservaModificada = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservasService: ReservasService,
    private dialog: MatDialog
  ) {}
>>>>>>> a539ce735c277d5afafb3ccff55dceac06f71eb6

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.reservaId = param.get('id');
        this.trabajadorId = param.get('trabajadorId');
      },
      error: (e: Error) => {
        console.log("Error: ", e.message);
      }
    })

<<<<<<< HEAD
   this.modificarRForm = this.fb.nonNullable.group(
  {
    fecha: ['', Validators.required],
      horario: ['', Validators.required],
      direccion: ['', Validators.required]
  });
  this.reservaId = this.route.snapshot.paramMap.get('id');
  //obtiene el id desde la url
    if (this.reservaId) {
      this.cargarDatosReserva(this.reservaId);
    }

  }
  cargarDatosReserva(id: string): void { // utiliza el ID para obtener los datos de la reserva existente y rellenar el formulario.
    this.rs.getReservaById(id).subscribe({
       next: (reserva: Reserva) => {
         this.modificarRForm.patchValue({
          fecha: reserva.fecha,
          horario: reserva.horario,
          direccion: reserva.direccion
        })
      },
      error: (e :Error) =>{
        console.log("Error al cargar los datos:", e.message);
      }
    }
    );
  }

  modificarReserva(): void{
    if (this.modificarRForm.invalid) return
    const reservaModificada ={
      ...this.modificarRForm.getRawValue(),
       id: this.reservaId,
      idTr: this.trabajadorId
    }


    this.rs.putReserva(reservaModificada,this.reservaId).subscribe(
      {
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
      }
    );
    
=======

    // Inicializar el formulario
    this.reservaForm = this.fb.group({
      fecha: ['', Validators.required],
      horario: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    // Cargar la reserva actual si existe el ID
    if (this.reservaId) {
      this.loadReservaData(this.reservaId);
    }
  }

  // Cargar los datos de la reserva en el formulario
  loadReservaData(id: string): void {
    this.reservasService.getReservaById(id).subscribe({
      next: (reserva: Reserva) => {
        this.reservaForm.setValue({
          fecha: reserva.fecha,
          horario: reserva.horario,
          direccion: reserva.direccion
        });
      },
      error: (error) => {
        console.error("Error al cargar la reserva:", error);
      }
    });
  }

  // Actualizar la reserva en la base de datos
  updateReserva(): void {
    if (this.reservaForm.invalid) return;

    const updatedReserva = {
      ...this.reservaForm.getRawValue(),
      id: this.reservaId,
      idTr: this.trabajadorId
    };

    console.log("Datos de la reserva a actualizar:", updatedReserva);
    console.log("ID de la reserva:", this.reservaId);

    if (this.reservaId) {
      this.reservasService.putReserva(updatedReserva, this.reservaId).subscribe({
        next: () => {
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Reserva actualizada con éxito.'
            }
          });

          this.reservaModificada.emit();
          this.router.navigate(['/notificaciones']);
        },
        error: (e: Error) => {
          console.error("Error al actualizar la reserva:", e);
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Ocurrió un error al actualizar la reserva. Por favor, inténtelo de nuevo.'
            }
          });
        }
      });
    } else {
      console.error("El ID de la reserva es nulo o indefinido.");
    }
>>>>>>> a539ce735c277d5afafb3ccff55dceac06f71eb6
  }
}


