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
  router = inject(Router);
  usuario? : Usuario;
  id : string | null = null;


  service = inject(UsuariosService);
  // Inyectamos el servicio FormBuilder para crear los formularios
  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.signInForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método que se llama al enviar el formulario de inicio de sesión
  onSignInSubmit()
  {
    // Si el formulario de inicio de sesión es inválido, detenemos el proceso
    if (this.signInForm.invalid) return;

    this.listarUsuarios();
    this.validarUsuarioLogin();
  }


    //!-------- Autenticacion ------------
    //Esto tiene que estar si o si

    auth = inject(AuthService);

    iniciarSesion (id: string)
    {
     this.auth.logIn(id) //Me logeo. Coloca el "estoyLogeado" del service en true
     //this.router.navigateByUrl('home'); // al logearme me lleva a esta pagina
    }
  //!----------------------------------------


//----------OPCION 2: Bajar la base de datos, guardarla en un array, y alli buscar el mail----


  listaUsuarios: Usuario[] = [];

  listarUsuarios() {
    this.service.getUsuarios().subscribe(
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

  validarUsuarioLogin(): boolean
  {
    const { email, password } = this.signInForm.getRawValue(); // Obtiene los datos "criterio" que va a usar para hacer la busqueda en la lista de usuarios
    // Busca en listaUsuarios si hay un usuario que coincide con el email y password
      const usuarioValido = this.listaUsuarios.find(user => {
        console.log(`Comparando con usuario:`);
        console.log(`Email en lista: ${user.email} - Email ingresado: ${email}`);
        console.log(`Password en lista: ${user.password} - Password ingresado: ${password}`);

        // Realiza la comparación
        return user.email === email && user.password === password;
    });


      if (usuarioValido)
        {
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: "Inicio de sesión con éxito 😊"
            }})


            const usuarioID = usuarioValido.id;
            this.iniciarSesion(usuarioID!);
            // Navegar a la ruta 'home/:id' pasando el ID del usuario
            this.router.navigate([`home/${usuarioID}`]); //!!!! MODIFICADO

            return true;
        } else
        {
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Email y/o Contraseña incorrectos. Intentelo nuevamente.'
            }})
          return false;
        }
  }



/*
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
                  console.log("Email: ", this.usuario.email);
                  console.log("Contraseña: ", this.usuario.password);
                  console.log("ID: ", this.usuario.id);

                  this.iniciarSesion(this.usuario?.id!);
                  this.router.navigate([`home/${this.usuario?.id}`]);
              } else
              {
                  alert('Email y/o Contraseña incorrectos. Intentelo nuevamente.');
              }
        },
        error: () => {
          console.log('Error al buscar por email');
          alert('Se ha producido un error. Intente nuevamente')
        }
      });
    }

    validarUsuarioLogin(): boolean
    {
      const { email, password } = this.signInForm.getRawValue(); // Obtiene los datos "criterio" que va a usar para hacer la busqueda en la lista de usuarios
      // Busca en listaUsuarios si hay un usuario que coincide con el email y password
        const usuarioValido = this.listaUsuarios.find(user => {
          console.log(`Comparando con usuario:`);
          console.log(`Email en lista: ${user.email} - Email ingresado: ${email}`);
          console.log(`Password en lista: ${user.password} - Password ingresado: ${password}`);

          // Realiza la comparación
          return user.email === email && user.password === password;
      });


        if (usuarioValido)
          {
            this.dialog.open(DialogoComponent, {
              panelClass: "custom-dialog-container",
              data: {
                message: "Inicio de sesión con éxito 😊"
              }})


              const usuarioID = usuarioValido.id;
              this.iniciarSesion(usuarioID!);
              // Navegar a la ruta 'home/:id' pasando el ID del usuario
              this.router.navigate([`home/${usuarioID}`]);

              return true;
          } else
          {
            this.dialog.open(DialogoComponent, {
              panelClass: "custom-dialog-container",
              data: {
                message: 'Email y/o Contraseña incorrectos. Intentelo nuevamente.'
              }})
            return false;
          }
    }


*/




}
