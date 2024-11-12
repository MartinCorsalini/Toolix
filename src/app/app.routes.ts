import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './component/LOGIN/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { FaqComponent } from './component/Inicio/faq/faq.component';
import { InicioPageComponent } from './component/Inicio/pages/inicio-page/inicio-page.component';
import { AltaBajaReservaComponent } from './Reservas/alta-baja-reserva/alta-baja-reserva.component';
import { AltaBajaPageComponent } from './Reservas/pages/alta-baja-page/alta-baja-page.component';

export const appRoutes: Routes = [

    {path: 'login',component: LoginRegisterComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home', component: InicioPageComponent},
    {path: 'preguntas-frecuentes', component: FaqComponent },
    {path: 'realizar-reserva', component: AltaBajaPageComponent},
    //{path: 'modificar-reserva', component: },
    {path: '**', redirectTo:'home'}
];
