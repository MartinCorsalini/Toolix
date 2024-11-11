import { Routes } from '@angular/router';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FaqComponent } from './component/Inicio/faq/faq.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';


export const appRoutes: Routes = [

    {path: 'login',component: LoginPageComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home', component: InicioPageComponent},
    {path: 'preguntas-frecuentes', component: FaqComponent },
    {path: '**', redirectTo:'home'}
];
