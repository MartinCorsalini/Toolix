import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  styleUrl: './login-sign-in.component.css'
})
export class LoginSignInComponent implements OnInit{

  signInForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!
  listaUsuarios: Usuario[] = [];
  auth = inject(AuthService);
  router = inject(Router)

  // Inyectamos el servicio FormBuilder para crear los formularios
  constructor(private fb: FormBuilder, private us: UsuariosService, private dialog: MatDialog) {}

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
    // Si el formulario de inicio de sesión es inválido, detenemos el proceso
    if (this.signInForm.invalid) return;

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
    const usuarioID = usuarioValido.id;

    // Navegar a la ruta 'home/:id' pasando el ID del usuario
    this.router.navigate(['/home', usuarioID]);

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
