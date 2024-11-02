import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginRegisterComponent } from './component/LOGIN/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { FooterComponent } from "./component/shared/footer/footer.component";
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { InicioComponent } from './component/HOME/pages/inicio/inicio.component';
import { LoginAnimationComponent } from './component/LOGIN/login-animation/login-animation.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            LoginAnimationComponent,
            OlvidasteContraseniaComponent,
            NavbarComponent,
            FooterComponent,
            InicioComponent
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'prueba';
}
