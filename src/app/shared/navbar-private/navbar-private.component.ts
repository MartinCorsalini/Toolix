import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UsuariosService } from '../../service/usuarios.service';
import { Usuario } from '../../interface/usuario';
import { ReservasService } from '../../service/reservas.service';

@Component({
  selector: 'app-navbar-private',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar-private.component.html',
  styleUrl: './navbar-private.component.css'
})
export class NavbarPrivateComponent implements OnInit, OnDestroy{
  ngOnInit(): void
  {
    this.auth.currentUserId$.subscribe(id => {
      this.userId = id;
    }); // AGARRA EL ID DEL USUARIO LOGEADO

    this.userRol = this.auth.getUserRole(); // AGREGADOO
    console.log('ROOOL:' + this.userRol);
    this.getById();


    this.obtenerNotificaciones();
     // Actualizar notificaciones inmediatamente al inicio
     this.actualizarNotificaciones();

  }

    //-----------------------------AGREGADO----------------------------------------

  constructor(
    private reservasService: ReservasService,
    private authService: AuthService
  ) {}


  userId: string | undefined = undefined;
  route = inject(Router)
  logoUrl: string = 'assets/images/logo.jpeg';
  isProfileOpen = false;

  //-----------------------------AGREGADO----------------------------------------
  notificacionesSinLeer: number = 0;
  private notificacionesInterval: any;

// AGREGADOO ---
userRol : string | undefined;
service = inject(UsuariosService);
usuario?: Usuario; //Por si se necesita


  //-----------------------------AGREGADO----------------------------------------
obtenerNotificaciones() {
  if (this.authService.estaLogeado()) {
    const userId = this.authService.getUserId();

    this.reservasService.getReserva().subscribe((reservas) => {
      this.notificacionesSinLeer = reservas.filter(res =>
        // Lógica para contar notificaciones no leídas
        (res.idTr === userId && (res.estado === 'pendiente' || !res.leida)) ||
        (res.idUs === userId && res.estado === 'pendiente')
      ).length;
    });
  }
}

 actualizarNotificaciones() {
  const userId = this.authService.getUserId();

  if (userId) {
    this.reservasService.getReserva().subscribe({
      next: (reservas) => {
        // Para trabajadores, filtra solo reservas pendientes o no finalizadas
        if (this.userRol === 'Trabajador') {
          this.notificacionesSinLeer = reservas.filter(res =>
            // Solo muestra notificaciones para reservas pendientes o no leídas
            res.idTr === userId &&
            (res.estado === 'pendiente' ) &&
            !res.calificada
          ).length;
        } else {
          // Mantén la lógica existente para otros roles
          this.notificacionesSinLeer = reservas.filter(res =>
            (res.idTr === userId && (res.estado === 'pendiente')) ||
            (res.idUs === userId && res.estado === 'pendiente')
          ).length;
        }
      },
      error: (error) => {
        console.error('Error al actualizar notificaciones:', error);
      }
    });
  }
}

ngOnDestroy() {
  if (this.notificacionesInterval) {
    clearInterval(this.notificacionesInterval);
  }
}

marcarNotificacionComoLeida(reservaId: string) {
  this.reservasService.marcarReservaComoLeida(reservaId).subscribe({
    next: () => {
      // Actualizar conteo después de marcar como leída
      this.actualizarNotificaciones();
    },
    error: (error) => {
      console.error('Error al marcar notificación:', error);
    }
  });
}

//---------------------------------------------------------------------



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


  openDropdown() {
    this.isProfileOpen = true;
  }

  closeDropdown() {
    this.isProfileOpen = false;
  }

  irADetalles()
  {
    this.route.navigate([`perfil-propio/${this.userId}`]);
  }

  irAHome()
  {
    console.log('id'+ this.userId);
    this.route.navigate([`home/${this.userId}`]);
  }



  ///-------------------- RUTAS PROTEGIDAS -----------------------
  //-------CHEKEAR ------ probando...

  auth = inject(AuthService);
  //textButton : string = 'Login'

  onLogout()
  {
     this.auth.LogOut();// Coloca el "estoyLogeado" del service en false
     this.route.navigateByUrl('login');
     localStorage.clear()

  }

//-------BORRADOR ------ video chaldu
/*
  textButton : string = 'Login'

  onLoginLogout2()
  {
      if(this.textButton == 'Login')
      {// LOGUEARME
        this.textButton = 'LogOut';
        this.auth.logIn() //Me logeo. Coloca el "estoyLogeado" del service en true
        this.route.navigateByUrl('home'); // al logearme me lleva a esta pagina
      }else
      {
        this.auth.LogOut();
        this.textButton = 'Login'
        this.route.navigateByUrl('login');
        localStorage.clear()
      }
  }
*/

}

