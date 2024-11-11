import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Usuario } from '../../../interface/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';


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
  listaUsuarios: Usuario[] = [];


  // Inyectamos el servicio FormBuilder para crear los formularios
  constructor(private fb: FormBuilder, private us: UsuariosService, private dialog: MatDialog) {}

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

    this.addUsuarioDB(usuario);

  }

  // Método que se llama al enviar el formulario de inicio de sesión
  //Permite iniciar sesion correctamente el async
  async onSignInSubmit() {
    if (this.signInForm.invalid) return;
  
    await this.listarUsuarios();  // Esperamos a que los usuarios se carguen antes de validar el login
    this.validarUsuarioLogin();
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

  addUsuarioDB(usuario: Usuario) {
    this.us.postUsuarios(usuario).subscribe(
      {
        next: (usuario: Usuario) => {

          this.listarUsuarios(); // Después de registrar el usuario, recargamos la lista de usuarios

          console.log("Usuario registrado correctamente:", usuario);

          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Se ha registrado exitosamente.\n🎉¡Muchas gracias por su confianza! 🎉'
            }
          });
        },
        error: (e: Error) => {
          console.log("Error al registrar usuario:", e.message);
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Ocurrió un error al registrar. Por favor, intente de nuevo.'
            }
          });
        }
      }
    );
  }

  async listarUsuarios(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.us.getUsuarios().subscribe({
        next: (usuarios: Usuario[]) => {
          this.listaUsuarios = usuarios;
          console.log("Usuarios cargados:", this.listaUsuarios); // Verificar la carga en consola
          resolve();
        },
        error: (e: Error) => {
          console.log("Error al cargar usuarios:", e.message);
          reject(e); // Opcionalmente, podemos manejar el error aquí
        }
      });
    });
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
