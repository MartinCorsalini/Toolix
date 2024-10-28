import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-olvidaste-contrasenia',
  standalone: true, // Marcar el componente como standalone
  templateUrl: './olvidaste-contrasenia.component.html',
  styleUrls: ['./olvidaste-contrasenia.component.css'],
  imports: [ReactiveFormsModule]  // Importar los módulos necesarios aquí
})
export class OlvidasteContraseniaComponent implements OnInit {
  forgotPasswordForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value);
    }
  }
}

