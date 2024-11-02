import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './component/LOGIN/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { InicioComponent } from './component/HOME/pages/inicio/inicio.component';
import { FaqComponent } from './component/HOME/pages/inicio/faq/faq.component';

export const appRoutes: Routes = [

    {path: 'login',component: LoginRegisterComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home', component: InicioComponent},
    { path: 'preguntas-frecuentes', component: FaqComponent },
    {path: '**', redirectTo:'home'}
];
