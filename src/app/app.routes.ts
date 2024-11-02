import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './component/LOGIN/login-register/login-register.component';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { InicioComponent } from './component/HOME/pages/inicio/inicio.component';
import { FaqComponent } from './component/HOME/pages/inicio/faq/faq.component';
import { LoginSignInComponent } from './component/LOGIN/login-signIn/login-sign-in/login-sign-in.component';
import { LoginAnimationComponent } from './component/LOGIN/login-animation/login-animation.component';

export const appRoutes: Routes = [

    {path: 'signUp',component: LoginAnimationComponent},
    {path: 'signIn',component: LoginAnimationComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home', component: InicioComponent},
    {path: 'preguntas-frecuentes', component: FaqComponent },
    {path: '**', redirectTo:'home'}
];
