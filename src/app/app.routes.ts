import { Routes } from '@angular/router';

import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { LoginRegisterComponent } from './component/LOGIN/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';

export const appRoutes: Routes = [

    {path: 'login',component: LoginRegisterComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home',component: InicioPageComponent},
    {path: '**', redirectTo:'home'}
];
