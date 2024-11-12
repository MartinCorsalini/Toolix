import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
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

  // Bandera para alternar el estilo visual del formulario entre login y registro
  //creo que no se usa
  isRightPanelActive: boolean = false;



  // Inyectamos el servicio FormBuilder para crear los formularios
  constructor(private fb: FormBuilder, private us: UsuariosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });

  }

  router = inject(Router);
  id : string | null = null;

  service= inject(UsuariosService);

  usuario? : Usuario;



  onSignUpSubmit()
  {
    if (this.signUpForm.invalid)
      {
        alert('Ha ocurrido un error al cargar registrarse. Intente nuevamente')
        return;
      }
    const usuario2 = this.signUpForm.getRawValue();

    this.addUsuarioDB(usuario2); // Agrego el usuario a la base de datos

    console.log(usuario2.email);
    this.buscarEmail(usuario2.email)


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


  //----- Hago un GET para acceder al ID asginado------
  // para eso busco con el mail, ya que el id se lo asigna al hacer el get y no se cual es ------

  buscarEmail(email: string) {
    this.service.getUsuarioByEmail(email).subscribe({
      next: (usuarios: Usuario[]) =>
        {
        if (usuarios.length > 0) {
          this.usuario = usuarios[0];
          alert('EMAIL ENCONTRADO CORRECTAMENTE');
          console.log("Email:", this.usuario.email);
          console.log("Nombre:", this.usuario.nombre);
          console.log("ID", this.usuario.id);
          this.router.navigate([`modificar/${this.usuario?.id}`]);
        } else {
          alert('No se encontró un usuario con ese email');
        }
      },
      error: () => {
        alert('Error al buscar por email');
      }
    });
  }

}
