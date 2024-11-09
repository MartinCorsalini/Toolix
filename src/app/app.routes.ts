import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './component/LOGIN/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { FaqComponent } from './component/Inicio/faq/faq.component';
import { InicioPageComponent } from './component/Inicio/pages/inicio-page/inicio-page.component';

export const appRoutes: Routes = [

    {path: 'login',component: LoginRegisterComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home', component: InicioPageComponent},
    {path: 'preguntas-frecuentes', component: FaqComponent },
    {path: '**', redirectTo:'home'}
];
