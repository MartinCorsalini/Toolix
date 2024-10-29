import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './component/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/olvidaste-contrasenia/olvidaste-contrasenia.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LoginRegisterComponent
    },
    {
        path: 'olvidaste-contrasenia',
        component: OlvidasteContraseniaComponent
    },
    {
        path: '**', //Si en el path hay cualquier cosa
        redirectTo:''
    }
];
