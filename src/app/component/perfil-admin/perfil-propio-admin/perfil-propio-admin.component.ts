import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../../service/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../interface/usuario';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from "../../../shared/navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-perfil-propio-admin',
  standalone: true,
  imports: [NavbarPrivateComponent, RouterLink, CommonModule, NavbarAdminComponent],
  templateUrl: './perfil-propio-admin.component.html',
  styleUrl: './perfil-propio-admin.component.css'
})
export class PerfilPropioAdminComponent implements OnInit{

  ngOnInit(): void {
    this.accederAlosDatos();
  }
  fotoUrl = 'assets/avatar/avatar.png';  // Ruta de la foto de perfil

  usuario?: Usuario;
  id : string | null = null;

  valoracion: number | null = null;       // Valor de la valoración
  stars: number[] = [];
  promedio :number= 0;

  service= inject(UsuariosService);
  ar= inject(ActivatedRoute);
  router = inject(Router);


  accederAlosDatos()
    {
      this.ar.paramMap.subscribe(
        {
          next: (param)=>
          {
              this.id = param.get('id');
              this.getById()
          },
          error: ()=>{
            alert('Error al acceder a los datos');
          }
        }
      )
    }

    getById()
    {
      this.service.getUsuarioById(this.id).subscribe(
        {
          next: (usuario : Usuario)=>
          {
            this.usuario = usuario;
          },
          error: () =>
          {
            alert('Error al acceder a los datos');
          }
        }
    )
    }


   
}

