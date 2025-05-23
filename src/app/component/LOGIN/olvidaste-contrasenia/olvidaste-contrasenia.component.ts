import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterLink, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';


@Component({
  selector: 'app-olvidaste-contrasenia',
  standalone: true, // Marcar el componente como standalone
  templateUrl: './olvidaste-contrasenia.component.html',
  styleUrls: ['./olvidaste-contrasenia.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    RouterLink,
    CommonModule
  ]

})
export class OlvidasteContraseniaComponent implements OnInit {
  signUpForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  forgotPasswordForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value);
      this.dialog.open(DialogoComponent, {
        panelClass: "custom-dialog-container",
        data: {
          message: 'Te hemos enviado un link para restaurar tu contraseña.'
        }
    });
  } else {
    this.dialog.open(DialogoComponent, {
      panelClass: "custom-dialog-container",
      data: {
        message: 'Email invalido.'
      }
  });
  }
}
}
