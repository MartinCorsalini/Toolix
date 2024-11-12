import { Routes } from '@angular/router';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FaqComponent } from './component/Inicio/faq/faq.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { PerfilTrabajadorComponent } from './component/perfil/perfil-trabajador/perfil-trabajador.component';
import { PerfilPropioComponent } from './component/perfil/perfil-propio/perfil-propio.component';
import { ModificarPerfilComponent } from './component/perfil/modificar-perfil/modificar-perfil.component';



export const appRoutes: Routes = [

    {path: 'login',component: LoginPageComponent},
    {path: 'olvidaste-contrasenia',component: OlvidasteContraseniaComponent},
    {path: 'home', component: InicioPageComponent},
    {path: 'preguntas-frecuentes', component: FaqComponent },
    {path: 'perfil-trabajador/:id', component: PerfilTrabajadorComponent },
    {path: 'perfil-propio/:id', component: PerfilPropioComponent },
    {path: 'modificar/:id', component: ModificarPerfilComponent },
    {path: '**', redirectTo:'home'}
];
