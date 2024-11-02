import { Routes } from '@angular/router';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { InicioComponent } from './component/HOME/pages/inicio/inicio.component';
import { FaqComponent } from './component/HOME/pages/inicio/faq/faq.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const appRoutes: Routes = [

    {path: 'signUp',component: LoginPageComponent},
    {path: 'signIn',component: LoginPageComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home', component: InicioComponent},
    {path: 'preguntas-frecuentes', component: FaqComponent },
    {path: '**', redirectTo:'home'}
];
