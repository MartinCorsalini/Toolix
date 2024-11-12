import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Reserva } from '../../interface/reserva';
import { ReservasService } from '../../service/reservas.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../component/Inicio/cuadro-dialogo/cuadro-dialogo.component';

@Component({
  selector: 'app-alta-baja-reserva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-baja-reserva.component.html',
  styleUrl: './alta-baja-reserva.component.css'
})
export class AltaBajaReservaComponent {
  reservaForm!: FormGroup; 
  listaReservas: Reserva[] = [];
closeDialog: any;
  dialogRef: any;

  constructor(
   
    private fb: FormBuilder,
    private rs: ReservasService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void{

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
