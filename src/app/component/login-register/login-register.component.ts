import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-login-register',
  standalone: true,
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  imports: [ReactiveFormsModule, CommonModule] // Asegúrate de importar CommonModule aquí

})


export class LoginRegisterComponent implements OnInit {
  signUpForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  signInForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  isRightPanelActive: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignUpSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    }
  }

  onSignInSubmit() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);
    }
  }

  toggleForms() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.toggle('right-panel-active');
    }
  }
}
