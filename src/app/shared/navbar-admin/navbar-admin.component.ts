import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent implements OnInit {
  ngOnInit(): void
  {
    this.authService.currentUserId$.subscribe(id => {
      this.userId = id;
    });

  }

  userId: string | undefined = undefined;

  constructor(private authService: AuthService) {}
  route = inject(Router)

  logoUrl: string = 'assets/images/logo.jpeg';


  isProfileOpen = false;



  openDropdown() {
    this.isProfileOpen = true;
  }

  closeDropdown() {
    this.isProfileOpen = false;
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

}
