import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AltaBajaReservaComponent } from '../../Reservas/alta-baja-reserva/alta-baja-reserva.component';
import { Usuario } from '../../../interface/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  ngOnInit(): void {
    this.accederAusuarios();

    this.authService.currentUserId$.subscribe(id => {
      this.userId = id;
    });

    this.getById();
  }

  @Input()
  listaUsuarios : Usuario[] =[];

  service = inject(UsuariosService);
  router = inject(Router);
  stars: number[] = [];


  // Calcula el promedio de valoraciones
  calcularPromedioValoracion(valoraciones: number[] | undefined): number {
    let promedio = 0;

  if (Array.isArray(valoraciones) && valoraciones.length > 0) {
    const suma = valoraciones.reduce((acc, val) => acc + val, 0);
    promedio = suma / valoraciones.length;
  }

  // Actualizamos las estrellas con el promedio calculado (o 0 si no hay valoraciones)
  this.actualizarEstrellas(promedio);

  return promedio;
  }

  actualizarEstrellas(promedio : number) {

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


  accederAusuarios()
  {
      this.service.getUsuarios().subscribe(
        {
          next: (usuarios: Usuario[])=>{
                this.listaUsuarios = usuarios;
          },
          error: (e: Error)=>{
            alert('Ha ocurrido un error:  ' + e.message);
          }
        }
      )
  }


  irADetalles(id:string)
  {
    this.router.navigate([`perfil-trabajador/${id}`]);
  }

  //ADMIN

  userRol : string | undefined;
  usuario?: Usuario; //Por si se necesita
  userId: string | undefined = undefined;
  constructor(private authService: AuthService) {}


  getById()
  {
    this.service.getUsuarioById(this.userId!).subscribe(
      {
        next: (usuario : Usuario)=>
        {
          this.usuario = usuario;
          this.userRol = usuario.rol;
        },
        error: () =>
        {
          alert('Error al acceder a los datos');
        }
      }
  )
  }


 //------------------lo que estaba antes --------------------
 /*
  @Input() idTrabajador: number | undefined = undefined; // inicializa
  @Output() eventReserva= new EventEmitter<number>();

  reservar(): void{
    this.eventReserva.emit(this.idTrabajador) //emite el id del trabajador

  }
    */
}
