import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UsuariosService } from '../../service/usuarios.service';
import { Usuario } from '../../interface/usuario';

@Component({
  selector: 'app-navbar-private',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar-private.component.html',
  styleUrl: './navbar-private.component.css'
})
export class NavbarPrivateComponent implements OnInit {
  ngOnInit(): void
  {
    this.auth.currentUserId$.subscribe(id => {
      this.userId = id;
    }); // AGARRA EL ID DEL USUARIO LOGEADO

    this.userRol = this.auth.getUserRole(); // AGREGADOO
    console.log('ROOOL:' + this.userRol);
    this.getById();

  }

  userId: string | undefined = undefined;


  route = inject(Router)

  logoUrl: string = 'assets/images/logo.jpeg';


  isProfileOpen = false;

// AGREGADOO ---
userRol : string | undefined;
service = inject(UsuariosService);
usuario?: Usuario; //Por si se necesita

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

