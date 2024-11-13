import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Usuario } from '../../../../interface/usuario';
import { UsuariosService } from '../../../../service/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-login-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './login-sign-in.component.html',
  styleUrls: ['./login-sign-in.component.css']
})
export class LoginSignInComponent implements OnInit {

  signInForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  auth = inject(AuthService);
  router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private us: UsuariosService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Si el usuario ya está autenticado, redirigir a la página de inicio
    if (this.auth.estaLogeado()) {
      this.router.navigateByUrl('home');
    }

    this.signInForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método que se llama al enviar el formulario de inicio de sesión
  onSignInSubmit() {
    if (this.signInForm.invalid) return;

    const { email, password } = this.signInForm.getRawValue();
    
    // Llamamos al nuevo método del servicio que busca directamente al usuario
    this.us.getUsuarioByEmailAndPassword(email, password).subscribe({
      next: (usuarios: Usuario[]) => {
        if (usuarios.length > 0) {
          // Usuario encontrado
          const usuarioValido = usuarios[0];
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: "Inicio de sesión con éxito 😊"
            }
          });
          const usuarioID = usuarioValido.id;

          // Navegar a la ruta 'home/:id' pasando el ID del usuario
          this.router.navigate(['/home', usuarioID]);

          // Llama al método logIn() del AuthService para guardar el token
          this.authService.logIn();
        } else {
          // Usuario no encontrado
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Email y/o Contraseña incorrectos. Intentelo nuevamente.'
            }
          });
        }
      },
      error: (e: Error) => {
        console.log("Error", e.message);
      }
    });
  }
}
