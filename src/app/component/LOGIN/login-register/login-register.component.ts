import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    RouterLink
  ]
})


export class LoginRegisterComponent implements OnInit {
  signUpForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  signInForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!

  // Bandera para alternar el estilo visual del formulario entre login y registro
  //creo que no se usa
  isRightPanelActive: boolean = false;


  // Inyectamos el servicio FormBuilder para crear los formularios
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });

    this.signInForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

//------------------ Acá termina el onit---------------------

  onSignUpSubmit() {
    if (this.signUpForm.invalid) return;
    const usuario = this.signUpForm.getRawValue();
  }

  // Método que se llama al enviar el formulario de inicio de sesión
  onSignInSubmit() {
    // Si el formulario de inicio de sesión es inválido, detenemos el proceso
    if (this.signInForm.invalid) return;
    // Aquí se añadirían las acciones necesarias para iniciar sesión (por ejemplo, autenticación en el servidor)
  }

  //-------METODO PARA LE MOVIMIENTO DE LA BARRA -----

  // Método para alternar entre los formularios de inicio de sesión y registro
  toggleForms() {
    // Seleccionamos el contenedor que contiene los formularios
    const container = document.getElementById('container');

    // Si el contenedor existe, alternamos la clase 'right-panel-active'
    if (container) {
      container.classList.toggle('right-panel-active');
    }
    // Esta clase se puede usar en CSS para aplicar diferentes estilos (por ejemplo, mostrar u ocultar el panel)
  }
}
