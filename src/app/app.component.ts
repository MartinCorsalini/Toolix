import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginRegisterComponent } from './component/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from "./component/footer/footer.component";
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginRegisterComponent, OlvidasteContraseniaComponent, NavbarComponent, FooterComponent,InicioPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prueba';
}
