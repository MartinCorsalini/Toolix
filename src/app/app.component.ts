import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarPrivateComponent } from './shared/navbar-private/navbar-private.component';
import { NavbarPublicComponent } from './shared/navbar-public/navbar-public.component';
import { FooterComponent } from './shared/footer/footer.component';

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

export class AppComponent {
  title = 'prueba';
}
