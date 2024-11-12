import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../../service/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../interface/usuario';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";

@Component({
  selector: 'app-perfil-propio',
  standalone: true,
  imports: [NavbarPrivateComponent],
  templateUrl: './perfil-propio.component.html',
  styleUrl: './perfil-propio.component.css'
})
export class PerfilPropioComponent implements OnInit{

  ngOnInit(): void {
    this.accederAlosDatos();
  }

  service= inject(UsuariosService);
  ar= inject(ActivatedRoute);
  router = inject(Router);
  retirado :boolean = false;

  usuario?: Usuario;
  id : string | null = null;


  fotoUrl = 'assets/images/electricista.jpeg';  // Ruta de la foto de perfil



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

    irAModificar(id:string)
    {
      this.router.navigate([`modificar/${id}`]);
    }
}
