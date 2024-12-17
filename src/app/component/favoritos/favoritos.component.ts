import { Component, inject, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interface/usuario';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarPrivateComponent } from '../../shared/navbar-private/navbar-private.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarPrivateComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit{

  @Input()
  listaUsuarios : Usuario[] =[];
  service = inject(UsuariosService);
  router = inject(Router);
  stars: number[] = [];



  ngOnInit(): void {
    this.authService.currentUserId$.subscribe(id => {
      this.userId = id;//Accedo al id del usuario actual

      //Con ese id del usuario actual, me guardo los datos del usuario y su rol.
      this.getById(); //Dentro de esta función llamo a accederAusuarios, que me carga la lista de usuarios
    });
  }


  accederAusuarios()
  {
      this.service.getUsuarios().subscribe(
        {
          next: (usuarios: Usuario[])=>
          {
                this.listaUsuarios = usuarios;

                // Después de obtener los usuarios, inicializamos el estado de 'isFavorito' en cada usuario
                this.listaUsuarios.forEach(usuario => {
                  // Establecer si el usuario está en los favoritos del usuario actual
                usuario.isFavorito = this.usuario?.favoritos?.includes(usuario.id!) || false;
                });
          },
          error: (e: Error)=>
          {
            alert('Ha ocurrido un error:  ' + e.message);
          }
        }
      )
  }


  irADetalles(id:string)
  {
    this.router.navigate([`perfil-trabajador/${id}`]);
  }


   //!---------------------------- ACCEDER AL USUARIO ACTUAL Y GUARDAR SUS DATOS --------------------------------
  userRol : string | undefined;
  usuario?: Usuario; //Por si se necesita
  userId: string | undefined = undefined;
  constructor(private authService: AuthService) {}


  getById()
  {
    if(this.userId != null)
    {
      this.service.getUsuarioById(this.userId!).subscribe(
        {
          next: (usuario : Usuario)=>
          {
            this.usuario = usuario;
            this.userRol = usuario.rol;
            this.accederAusuarios();
          },
          error: () =>
          {
            alert('Error al acceder a los datos');
          }
        }
      )
    }

  }

 //!---------------------------- FAVORITOS--------------------------------
  //--------------------BOTON FAVORITOS----------------------
  toggleFavorito(usuarioId: string) {
    const esFavorito = this.usuario!.favoritos?.includes(usuarioId);
    const favoritosActualizados = esFavorito
      ? this.usuario!.favoritos!.filter(id => id !== usuarioId) // Quitar el ID si ya es favorito
      : [...(this.usuario!.favoritos || []), usuarioId]; // Agregar el ID si no es favorito

    this.usuario!.favoritos = favoritosActualizados;

    // También actualizar el estado 'isFavorito' en la lista de usuarios
    const usuario = this.listaUsuarios.find(u => u.id === usuarioId);
    if (usuario) {
      usuario.isFavorito = !esFavorito;
    }

    this.service.putUsuario(this.usuario!, this.usuario!.id!).subscribe({
      next: () => {
        console.log(`Se ha ${esFavorito ? 'eliminado' : 'agregado'} correctamente al usuario id: ${usuarioId} como favorito.`);
      },
      error: (e: Error) => {
        alert('Se ha producido un error al agregar favorito: ' + e.message);
      }
    });
  }


  //!---------------------------- VALORACIONES --------------------------------

  // Calcula el promedio de valoraciones
  calcularPromedioValoracion(valoraciones: number[] | undefined): number
  {
    let promedio = 0;

    if (Array.isArray(valoraciones) && valoraciones.length > 0)
    {
      const suma = valoraciones.reduce((acc, val) => acc + val, 0);
      promedio = suma / valoraciones.length;
    }

    // Actualizamos las estrellas con el promedio calculado (o 0 si no hay valoraciones)
    this.actualizarEstrellas(promedio);

    return promedio;
  }

  actualizarEstrellas(promedio : number)
  {
    if (promedio === 0) {
      // Si el promedio es 0, muestra 5 estrellas vacías
      this.stars = [0, 0, 0, 0, 0];
      return;
    }

    const promedioDividio = promedio / 2; // Promedio en una escala de 5
    const estrellasLlenas = Math.floor(promedioDividio);
    const mediaEstrella = promedioDividio % 1 >= 0.5 ? 1 : 0;
    const estrellasVacias = 5 - estrellasLlenas - mediaEstrella;

    this.stars = [
      ...Array(estrellasLlenas).fill(1),  // Estrellas llenas
      ...Array(mediaEstrella).fill(0.5),  // Media estrella (si aplica)
      ...Array(estrellasVacias).fill(0),  // Estrellas vacías
    ];
  }
}
