import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarPrivateComponent } from './shared/navbar-private/navbar-private.component';
import { NavbarPublicComponent } from './shared/navbar-public/navbar-public.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavbarPrivateComponent,
    NavbarPublicComponent,
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

}
