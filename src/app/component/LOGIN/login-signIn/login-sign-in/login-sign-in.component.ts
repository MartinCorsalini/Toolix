import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Usuario } from '../../../../interface/usuario';
import { UsuariosService } from '../../../../service/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../../HOME/pages/inicio/cuadro-dialogo/cuadro-dialogo.component';

@Component({
  selector: 'app-login-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './login-sign-in.component.html',
  styleUrl: './login-sign-in.component.css'
})
export class LoginSignInComponent implements OnInit{
  signInForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  listaUsuarios: Usuario[] = [];

  // Inyectamos el servicio FormBuilder para crear los formularios
  constructor(private fb: FormBuilder, private us: UsuariosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.signInForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método que se llama al enviar el formulario de inicio de sesión
  onSignInSubmit() {
    // Si el formulario de inicio de sesión es inválido, detenemos el proceso
    if (this.signInForm.invalid) return;
    const { email, password } = this.signInForm.getRawValue();

    this.listarUsuarios();

    this.validarUsuarioLogin();
  }

  listarUsuarios() {
    this.us.getUsuarios().subscribe(
      {
        next: (usuarios: Usuario[]) => {
          this.listaUsuarios = usuarios;
        },
        error: (e: Error) => {
          console.log("Error", e.message);
        }
      }
    )
  }

  validarUsuarioLogin(): boolean {
    const { email, password } = this.signInForm.getRawValue(); // Obtiene los datos "criterio" que va a usar para hacer la busqueda en la lista de usuarios

  // Busca en listaUsuarios si hay un usuario que coincide con el email y password
  const usuarioValido = this.listaUsuarios.find(
    user => user.email === email && user.password === password
  );

  if (usuarioValido) {
    this.dialog.open(DialogoComponent, {
      panelClass: "custom-dialog-container",
      data: {
        message: "Inicio de sesión con éxito 😊"
      }})
    // Redigir al usuario a la vista de mejores trabajadores
    return true;
  } else {
    this.dialog.open(DialogoComponent, {
      panelClass: "custom-dialog-container",
      data: {
        message: 'Email y/o Contraseña incorrectos. Intentelo nuevamente.'
      }})
    return false;
  }
  }

}
