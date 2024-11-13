import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../Inicio/card/card.component';
import { Reserva } from '../../../interface/reserva';
import { ReservasService } from '../../../service/reservas.service';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { AuthService } from '../../../service/auth.service';


@Component({
  selector: 'app-alta-baja-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardComponent],
  templateUrl: './alta-baja-reserva.component.html',
  styleUrl: './alta-baja-reserva.component.css'
})
export class AltaBajaReservaComponent {
  reservaForm!: FormGroup; 
  listaReservas: Reserva[] = [];
closeDialog: any;
  dialogRef: any;
  usuarioActualId: string | undefined = undefined; // Variable para almacenar el ID del usuario

  constructor(
   
    private fb: FormBuilder,
    private rs: ReservasService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}
  ngOnInit(): void{
    this.usuarioActualId = this.authService.getUserId();

    this.reservaForm = this.fb.group({
      fecha: ['', Validators.required], 
      horario: ['', Validators.required], 
      direccion: ['', Validators.required] 
    });
  }

  //

  addReserva(){
    if(this.reservaForm.invalid)return;
    const reserva= this.reservaForm.getRawValue();
    this.addReservaDB(reserva)

  }
  //
  addReservaDB(reserva: Reserva) {
    reserva.idUs = this.usuarioActualId;

    //reserva.trabajadorId = this.trabajadorSeleccionadoId; /
    this.rs.postReserva(reserva).subscribe(
      {
        next: (reserva: Reserva) => {
          console.log("Reserva realizada correctamente:", reserva);
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
      }
    );
  }

// 
closeDialogR(): void {
  this.dialogRef.close(); // Cierra el diálogo
}
}
