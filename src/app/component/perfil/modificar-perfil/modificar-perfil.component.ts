import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../service/usuarios.service';
import { Usuario } from '../../../interface/usuario';

import { NavbarPrivateComponent } from '../../../shared/navbar-private/navbar-private.component';
import { AuthService } from '../../../service/auth.service';


@Component({
  selector: 'app-modificar-perfil',
  standalone: true,

  imports: [NavbarPrivateComponent, ReactiveFormsModule,RouterLink],

  templateUrl: './modificar-perfil.component.html',
  styleUrl: './modificar-perfil.component.css'
})
export class ModificarPerfilComponent implements OnInit {

  ngOnInit(): void {
    this.rellenarDatosEnFormulario();

    this.authService.currentUserId$.subscribe(id => {
      this.IdUsuarioLogeado = id;
    });
    this.getIdUsuarioLogeado();
  }

  id : string | null = null;
  activatedRoute = inject(ActivatedRoute);

  fotoUrl = 'assets/avatar/avatar.png';

  fb= inject(FormBuilder);
  service= inject(UsuariosService);
  router= inject(Router);
  trabajador?: Usuario;
  constructor(private authService: AuthService) {}


  IdUsuarioLogeado : string | undefined;
    userRol : string | undefined;



    formulario = this.fb.nonNullable.group(
      {
        nombre: ['', [Validators.required]],
        profesion: [''],
        disponibilidad: [''],
        zona: [''],
        descripcion: [''],
        telefono:['',[Validators.required] ],
        email:[this.trabajador?.email!],
        password:[this.trabajador?.password!],
        rol:[this.trabajador?.rol!],
        favoritos:[this.trabajador?.favoritos!],
        valoraciones:[this.trabajador?.valoraciones!],
        fotoPerfil:[this.trabajador?.fotoPerfil!]
      }
    )

   rellenarDatosEnFormulario()
    {
      this.activatedRoute.paramMap.subscribe(
        {
          next: (param)=>
          {
            this.id = param.get('id');
            this.getByid(this.id);

          },
          error: (e : Error)=>{
            console.log('Error al recibir los datos:' + e.message );
          }
        }
      )
    }

    getByid(id: string| null){
      this.service.getUsuarioById(id).subscribe(
        {
          next: (trabajador : Usuario)=>
          {

            this.trabajador = trabajador;
                this.formulario.controls['nombre'].setValue(trabajador.nombre);
                this.formulario.controls['profesion'].setValue(trabajador.profesion!);
                this.formulario.controls['disponibilidad'].setValue(trabajador.disponibilidad!);
                this.formulario.controls['zona'].setValue(trabajador.zona!);
                this.formulario.controls['descripcion'].setValue(trabajador.descripcion!);
                this.formulario.controls['rol'].setValue(trabajador.rol!);
                this.formulario.controls['telefono'].setValue(trabajador.telefono!);
                this.formulario.controls['valoraciones'].setValue(trabajador.valoraciones!);

          },
          error: () =>
          {
            console.log('error');
          }
        }
      )
    }

    actualizar()
    {
      if(this.formulario.invalid)
        {
          alert('Los datos contienen errores. Intente nuevamente');
          return;
        }

      const usuario2 = this.formulario.getRawValue();

      usuario2.email = this.trabajador?.email!;
      usuario2.password = this.trabajador?.password!;

      this.service.putUsuario(usuario2, this.id).subscribe(
        {
          next: ()=>
          {
            alert('Actualizado correctamente');
            if(this.userRol === 'Admin')
            {
              this.router.navigate([`perfil-trabajador/${this.id}`]);
            }
            else
            {
              this.router.navigate([`perfil-propio/${this.id}`]);
            }

          },
          error: (e: Error)=>{
            alert('Se ha producido un error al actualizar: '+ e.message);
          }
        }
      )
    }


    getIdUsuarioLogeado(){
      this.service.getUsuarioById(this.IdUsuarioLogeado!).subscribe(
        {
          next: (usuario : Usuario)=>
          {
            this.userRol = usuario.rol;

            console.log('ROL USUARIO ACTUAL:' + this.userRol);
          },
          error: () =>
          {
            alert('Error al acceder a los datos');
          }
        }
    )
    }

}
