
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [NavbarPrivateComponent,ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './modificar-reserva.component.html',
  styleUrl: './modificar-reserva.component.css'
})

export class ModificarReservaComponent implements OnInit {

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
    

  }

}


