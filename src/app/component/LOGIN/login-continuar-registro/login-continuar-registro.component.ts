import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../service/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-continuar-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-continuar-registro.component.html',
  styleUrls: ['./login-continuar-registro.component.css']
})
export class LoginContinuarRegistroComponent {

  userId: string | undefined = undefined;


  signUpForm2!: FormGroup;

  route  = inject(Router);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginContinuarRegistroComponent>
  ) {
    this.signUpForm2 = this.fb.group({
      profesion: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      zona: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.signUpForm2.valid) {
      this.dialogRef.close(this.signUpForm2.value); // Envía los datos y cierra el diálogo

      // Tratando de que me lleve al home   CREO QUE ESO DE ABAJO HAY QUE BORRARLO
      this.authService.currentUserId$.subscribe(id => {
        this.userId = id;
      });
      this.route.navigate([`home/${this.userId}`]);
    }
  }
}
