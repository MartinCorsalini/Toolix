import { Component, inject, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Usuario } from '../../../interface/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { AuthService } from '../../../service/auth.service';
import { LoginContinuarRegistroComponent } from '../login-continuar-registro/login-continuar-registro.component';


@Component({
  selector: 'app-login-register',
  standalone: true,
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ]

})


export class LoginRegisterComponent implements OnInit {
  signUpForm!: FormGroup;  // ¡Aseguramos que se inicializa antes de usarse!

  // Bandera para alternar el estilo visual del formulario entre login y registro
  //creo que no se usa
  isRightPanelActive: boolean = false;
  selectedRole: string = '';

  // Inyectamos el servicio FormBuilder para crear los formularios
  constructor(private fb: FormBuilder, private us: UsuariosService, private dialog: MatDialog) {}

  ngOnInit(): void {

      // Si el usuario ya está autenticado, redirigir a la página de inicio
    if (this.auth.estaLogeado())
      {
         this.router.navigateByUrl('home');
      }

    //me caga en vacio los elementos del formulario
      this.signUpForm = this.fb.nonNullable.group({
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        rol: ['', [Validators.required]]
      });

       // Escuchar cambios en el campo `rol` del formulario
    this.signUpForm.get('rol')?.valueChanges.subscribe(value => {
      this.selectedRole = value;
    });

  }

  router = inject(Router);
  id : string | null = null;
  service= inject(UsuariosService);
  usuario? : Usuario;
  usuario2? : Usuario;
  userData: any = {}; // Variable para guardar los datos del primer formulario

  onSignUpSubmit(usuario?: Usuario) {
    if (this.signUpForm.invalid && !usuario) return;

    let completeUserData: Usuario;

    if (usuario) {
      // Si se proporciona 'usuario' (que le llega de openContinuarRegistroDialog), se guardan los datos de su formulario (que son los del formualrio del trabajador)
      completeUserData = usuario;
    } else {
      // De lo contrario, obtener los datos del formulario del cliente
      completeUserData = this.signUpForm.getRawValue();
    }


    // Verificar el rol del usuario y proceder en consecuencia
    if (completeUserData.rol === 'Trabajador') {
  
      this.addUsuarioDB(completeUserData);
      this.buscarEmail(completeUserData.email);

    } else if (completeUserData.rol === 'Cliente') {

      this.addUsuarioDB(completeUserData);
      this.buscarEmail(completeUserData.email);

    } else {

      this.dialog.open(DialogoComponent, {
        panelClass: "custom-dialog-container",
        data: {
          message: 'Rol de usuario inválido.'
        }
      });
    }
  }

    addUsuarioDB(usuario: Usuario)
    {
      this.us.postUsuarios(usuario).subscribe(
        {
          next: (usuario: Usuario) => {

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

  openContinuarRegistroDialog(): void {
    if (this.signUpForm.valid) {
      // Guarda los datos del primer formulario
      this.userData = this.signUpForm.value;

      // Abre el pop-up para el segundo formulario
      const dialogRef = this.dialog.open(LoginContinuarRegistroComponent, {
        panelClass: "custom-dialog-container"
      });;

      // Maneja el cierre del diálogo y recibe los datos del segundo formulario
      dialogRef.afterClosed().subscribe(secondFormData => {
        if (secondFormData) {
          // Combina los datos de ambos formularios
          const completeUserData = { ...this.userData, ...secondFormData };

          // Envía los datos combinados a la base de datos
          this.onSignUpSubmit(completeUserData);
        }
      });
    } else {
      this.dialog.open(DialogoComponent, {
        panelClass: "custom-dialog-container",
        data: {
          message: 'Ocurrió un error al registrar. Por favor, intente completar los datos del primer formulario.'
        }
      });
    }
  }


  //----- Hago un GET para acceder al ID asginado------
  // para eso busco con el mail, ya que el id se lo asigna al hacer el get y no se cual es ------

  buscarEmail(email: string)
   {
      this.service.getUsuarioByEmail(email).subscribe({
        next: (usuarios: Usuario[]) =>
          {
              if (usuarios.length > 0)
              {
                  this.usuario = usuarios[0];
                  console.log('EMAIL ENCONTRADO CORRECTAMENTE');
                  console.log("Email:", this.usuario.email);
                  console.log("Nombre:", this.usuario.nombre);
                  console.log("ID", this.usuario.id);

                  this.iniciarSesion(this.usuario?.id!);
                  this.router.navigate([`/home`, this.usuario.id]);
              } else
              {
                  alert('No se encontró un usuario con ese email');
              }
        },
        error: (e: Error) => {
          console.log("Error: ", e.message);
        }
      });
    }


  //---------RUTAS PRIVADAS -------
   // probando...
   auth = inject(AuthService);

   iniciarSesion (id: string)
   {
    this.auth.logIn(id) //Me logeo. Coloca el "estoyLogeado" del service en true
    //this.router.navigateByUrl('home'); // al logearme me lleva a esta pagina
   }

}
