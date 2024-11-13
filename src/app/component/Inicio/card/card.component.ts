import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AltaBajaReservaComponent } from '../../Reservas/alta-baja-reserva/alta-baja-reserva.component';
import { Usuario } from '../../../interface/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AltaBajaReservaComponent, RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  ngOnInit(): void {
    this.accederApilotos()
  }

  @Input()
  listaUsuarios : Usuario[] =[];

  service = inject(UsuariosService);
  router = inject(Router);
  

  accederApilotos()
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




 //------------------lo que estaba antes --------------------
 /*
  @Input() idTrabajador: number | undefined = undefined; // inicializa
  @Output() eventReserva= new EventEmitter<number>();

  reservar(): void{
    this.eventReserva.emit(this.idTrabajador) //emite el id del trabajador

  }
    */
}
