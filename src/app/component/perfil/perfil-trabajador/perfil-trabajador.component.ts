import { Component, inject, OnInit, signal } from '@angular/core';
import { Usuario } from '../../../interface/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarPrivateComponent } from '../../../shared/navbar-private/navbar-private.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-trabajador',
  standalone: true,
  imports: [NavbarPrivateComponent, CommonModule, RouterLink,FormsModule],
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

  mostrarValoracionInput = signal(false); // Controla visibilidad del input de valoración
  valoracion: number | null = null;       // Valor de la valoración

  fotoUrl = 'assets/avatar/avatar.png';  // Ruta de la foto de perfil


// Alterna visibilidad del input de valoración
mostrarInput() {
  this.mostrarValoracionInput.update((visible) => !visible);
}

// Valida que el valor esté entre 1 y 10
validarValoracion() {
  if (this.valoracion !== null) {
    this.valoracion = Math.min(10, Math.max(1, this.valoracion));
  }
}

// Carga datos del usuario
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

  // Obtiene usuario por ID
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

// Navega a la página de reserva
    irAreservar(id:string)
    {
      this.router.navigate([`realizar-reserva/${id}`]);
    }

}
