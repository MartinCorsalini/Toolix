import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Usuario } from '../../../interface/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../HOME/pages/inicio/cuadro-dialogo/cuadro-dialogo.component';


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

//------------------ Acá termina el onit---------------------

  onSignUpSubmit() {
    if (this.signUpForm.invalid) return;
    const usuario = this.signUpForm.getRawValue();

    this.addUsuarioDB(usuario);

  }

    addUsuarioDB(usuario: Usuario){
    this.us.postUsuarios(usuario).subscribe(
      {
        next: (usuario: Usuario) => {
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: 'Se ha registrado exitosamente.\n🎉¡Muchas gracias por su confianza! 🎉'
            }})
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      }
    )

  }
}
