import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginRegisterComponent } from './component/LOGIN/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioPageComponent } from './component/Inicio/pages/inicio-page/inicio-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            LoginRegisterComponent,
            OlvidasteContraseniaComponent,
            NavbarComponent,
            FooterComponent,
            InicioPageComponent
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'prueba';
}
