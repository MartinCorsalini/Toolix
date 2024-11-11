import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})

export class PopUpComponent {
  reservaForm: FormGroup; 

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
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
    if (this.reservaForm.valid) {
      const reservaData = this.reservaForm.value; // Obtenemos los datos del formulario
      this.dialogRef.close(reservaData); // Cerramos el diálogo y devolvemos los datos
    }
  }
}
