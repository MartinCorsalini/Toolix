import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarPrivateComponent } from './shared/navbar-private/navbar-private.component';
import { NavbarPublicComponent } from './shared/navbar-public/navbar-public.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavbarPrivateComponent,
    NavbarPublicComponent,
    FooterComponent,
    LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuthStatus();
  }
}
