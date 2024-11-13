import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../interface/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarPrivateComponent } from '../../../shared/navbar-private/navbar-private.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-trabajador',
  standalone: true,
  imports: [NavbarPrivateComponent, CommonModule, RouterLink],
  templateUrl: './perfil-trabajador.component.html',
  styleUrl: './perfil-trabajador.component.css'
})
export class PerfilTrabajadorComponent implements OnInit {

  ngOnInit(): void {
    this.accederAlosDatos();
    //this.stars = Array(Math.round(this.usuario?.valoracion!)).fill(1);  // Calcula el número de estrellas
  }
    //stars: number[] = [];


  service= inject(UsuariosService);
  ar= inject(ActivatedRoute);
  router = inject(Router);

  usuario?: Usuario;
  id : string | null = null;


  fotoUrl = 'assets/avatar/avatar.png';  // Ruta de la foto de perfil



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

    irAreservar(id:string)
    {
      this.router.navigate([`realizar-reserva/${id}`]);
    }

}
