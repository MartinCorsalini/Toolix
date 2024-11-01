import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './component/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';

export const appRoutes: Routes = [

    {path: 'login',component: LoginRegisterComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home',component: InicioPageComponent},
    {path: '**', redirectTo:'home'}
];
