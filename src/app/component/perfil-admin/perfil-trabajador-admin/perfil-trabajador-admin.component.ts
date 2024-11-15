import { Component, inject, OnInit, signal } from '@angular/core';
import { Usuario } from '../../../interface/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarPrivateComponent } from '../../../shared/navbar-private/navbar-private.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { NavbarAdminComponent } from "../../../shared/navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-perfil-trabajador-admin',
  standalone: true,
  imports: [NavbarPrivateComponent, CommonModule, RouterLink, FormsModule, NavbarAdminComponent],
  templateUrl: './perfil-trabajador-admin.component.html',
  styleUrl: './perfil-trabajador-admin.component.css'
})
export class PerfilTrabajadorAdminComponent implements OnInit {
  fotoUrl = 'assets/avatar/avatar.png';  // Ruta de la foto de perfil

  service= inject(UsuariosService);
  ar= inject(ActivatedRoute);
  router = inject(Router);

  usuario?: Usuario;
  id : string | null = null;

  mostrarValoracionInput = false; // Cambiado a booleano // Controla visibilidad del input de valoración
  valoracion: number | null = null;       // Valor de la valoración
  stars: number[] = [];


  ngOnInit(): void {
    this.accederAlosDatos();
    this.actualizarEstrellas(); // Cálculo de estrellas al iniciar
  }

// Alterna visibilidad del input de valoración
mostrarInput() {
  this.mostrarValoracionInput = !this.mostrarValoracionInput;
}

// Valida que el valor esté entre 1 y 10
validarValoracion() {
  if (this.valoracion !== null) {
    this.valoracion = Math.min(10, Math.max(1, this.valoracion));
  }
}

//HAGO UN PUT para actualizar las validaciones (se agrega la nueva validacion al array)
cargarValoracionDB()
    {

      if (!this.usuario?.valoraciones) {
        this.usuario!.valoraciones = this.usuario?.valoraciones ?? []; // Inicializa el array si está undefined
      }

      this.usuario!.valoraciones.push(this.valoracion!);

      console.log('VALORACION CARGADA AL ARRAY: '+ this.valoracion + '   --ARRAY:' + this.usuario?.valoraciones);

      this.service.putUsuario(this.usuario!, this.usuario?.id!).subscribe(
        {
          next: ()=>
          {
            alert('Actualizado correctamente');
            this.valoracion = null; // Limpia el campo de valoración
            this.mostrarValoracionInput = false; // Oculta el input después de enviar
            this.actualizarEstrellas();
          },
          error: (e: Error)=>{
            alert('Se ha producido un error al actualizar: '+ e.message);
          }
        }
      )
    }


  // Calcula el promedio de valoraciones
  calcularPromedioValoracion(): number {
    if (this.usuario?.valoraciones?.length) {
      const suma = this.usuario.valoraciones.reduce((acc, val) => acc + val, 0);
      return suma / this.usuario.valoraciones.length;
    }
    return 0;
  }

    // Convierte el promedio en estrellas llenas, medias y vacías
    actualizarEstrellas() {

      const promedio = this.calcularPromedioValoracion() / 2; // Promedio en una escala de 5
      const estrellasLlenas = Math.floor(promedio);
      const mediaEstrella = promedio % 1 >= 0.5 ? 1 : 0;
      const estrellasVacias = 5 - estrellasLlenas - mediaEstrella;

      this.stars = [
        ...Array(estrellasLlenas).fill(1),  // Estrellas llenas
        ...Array(mediaEstrella).fill(0.5),  // Media estrella (si aplica)
        ...Array(estrellasVacias).fill(0),  // Estrellas vacías
      ];
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
            this.actualizarEstrellas(); // Actualiza las estrellas
          },
          error: () =>
          {
            alert('Error al acceder a los datos');
          }
        }
    )
    }

}
