import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { UsuariosService } from '../../../service/usuarios.service';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../interface/usuario';

@Component({
  selector: 'app-eliminar-cuenta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eliminar-cuenta.component.html',
  styleUrl: './eliminar-cuenta.component.css'
})

export class EliminarCuentaComponent implements OnInit {

  constructor( private dialog: MatDialog,private uS: UsuariosService, private router: Router, private auth : AuthService) {}

  ngOnInit()
  {

    this.idUsuarioLogeado = this.auth.getUserId();  // ID PROPIO, del usuario logueado
    this.getById(this.idUsuarioLogeado!);


    this.accederAlUsuarioAborrar(); // TOMA EL ID DEL USUARIO DE LA URL

  }

  idUsuarioLogeado? : string| null // ID PROPIO, del usuario logueado
  userRol : string | undefined;
  service = inject(UsuariosService);
  activatedRoute = inject(ActivatedRoute);
  idAborrar : string | null = null; //ID SACADO DE LA RUTA

  usuario?: Usuario; //Por si se necesita


  accederAlUsuarioAborrar()
    {
      this.activatedRoute.paramMap.subscribe(
        {
          next: (param)=>
          {
            this.idAborrar = param.get('id');

          },
          error: (e : Error)=>{
            console.log('Error al recibir los datos:' + e.message );
          }
        }
      )
    }

  confirmarEliminar() {
    this.uS.deleteUsuario(this.idAborrar!).subscribe({
      next: () => {




        if(this.userRol === 'Admin')
        {
          this.router.navigate([`home/${this.idUsuarioLogeado}`]);
        }
        else
        {
          this.auth.LogOut();
          this.router.navigate(['/login']);

        }

        this.dialog.open(DialogoComponent, {
          panelClass: "custom-dialog-container",
          data: {
            message: "Se ha eliminado la cuenta con éxito"
          }
        },
    )},
      error: (e : Error) => {
        console.error('Error al eliminar la cuenta:', e.message);
      }
    });
  }



  getById(id: string| null)
  {
    this.service.getUsuarioById(id!).subscribe(
      {
        next: (usuario : Usuario)=>
        {
          this.userRol = usuario.rol;
        },
        error: () =>
        {
          alert('Error al acceder a los datos');
        }
      }
  )
  }

}
