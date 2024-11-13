import { Component, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../component/Inicio/search-bar/search-bar.component';
import { CardComponent } from '../../component/Inicio/card/card.component';
import { GridComponent } from '../../component/Inicio/grid/grid.component';
import { NavbarPublicComponent } from "../../shared/navbar-public/navbar-public.component";
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";
import { UsuariosService } from '../../service/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../interface/usuario';


@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [SearchBarComponent, GridComponent, NavbarPublicComponent, NavbarPrivateComponent],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent implements OnInit {

  ngOnInit(): void {
   // this.accederAlosDatos();
  }

  service= inject(UsuariosService);
  ar= inject(ActivatedRoute);
  router = inject(Router);

  usuario?: Usuario; // Dejo los datos del usuario acá por si los necesitamos para algo
  id : string | null = null;

  accederAlosDatos()
    {
      this.ar.paramMap.subscribe(
        {
          next: (param)=>
          {
              this.id = param.get('id'); // Acá se guarda el id sacado de la ruta
              this.getById()
          },
          error: ()=>{
            alert('Error al acceder a los datos');
          }
        }
      )
    }

    getById() //ESTO POR AHORA NO SE USA, ya que no hacemos nada con los datos del usuario en la page
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
