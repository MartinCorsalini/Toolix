import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alta-baja-reserva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-baja-reserva.component.html',
  styleUrl: './alta-baja-reserva.component.css'
})
export class AltaBajaReservaComponent {
  reservaForm: FormGroup; 

  constructor(
    public dialogRef: MatDialogRef<AltaBajaReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder 
  ) {

    this.reservaForm = this.fb.group({
      fecha: ['', Validators.required], 
      horario: ['', Validators.required], 
      direccion: ['', Validators.required] 
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  realizarReserva(): void {
    if (this.reservaForm.invalid) return;
    
    const reservaData = this.reservaForm.getRawValue; // Obtenemos los datos del formulario
    this.dialogRef.close(reservaData); // Cerramos el diálogo y devolvemos los datos
  }
}
