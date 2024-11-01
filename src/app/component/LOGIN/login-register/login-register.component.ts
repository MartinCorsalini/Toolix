import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  imports: [ReactiveFormsModule, CommonModule,RouterModule]

})


export class LoginRegisterComponent implements OnInit {
  signUpForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  signInForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  isRightPanelActive: boolean = false;

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



  onSignUpSubmit() {
    if (this.signUpForm.invalid) return;
    const usuario = this.signUpForm.getRawValue();

  }

  onSignInSubmit() {
    if (this.signInForm.invalid) return;


  }

  toggleForms() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.toggle('right-panel-active');
    }
  }
}
