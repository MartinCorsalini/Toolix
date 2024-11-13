import { Routes } from '@angular/router';
import { OlvidasteContraseniaComponent } from './component/LOGIN/olvidaste-contrasenia/olvidaste-contrasenia.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FaqComponent } from './component/faq/faq.component';
import { AltaBajaPageComponent } from './pages/alta-baja-page/alta-baja-page.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { PerfilTrabajadorComponent } from './component/perfil/perfil-trabajador/perfil-trabajador.component';
import { PerfilPropioComponent } from './component/perfil/perfil-propio/perfil-propio.component';
import { ModificarPerfilComponent } from './component/perfil/modificar-perfil/modificar-perfil.component';
import { NotificacionesPageComponent } from './pages/notificaciones-page/notificaciones-page.component';
import { authGuard } from './guard/auth.guard';
import { NosotrosComponent } from './component/generales/nosotros/nosotros.component';
import { ContactoComponent } from './component/generales/contacto/contacto.component';
import { PoliticasPrivacidadComponent } from './component/generales/politicas-privacidad/politicas-privacidad.component';
import { TerminosServicioComponent } from './component/generales/terminos-servicio/terminos-servicio.component';




export const appRoutes: Routes = [
    {
      path: 'login',
      component: LoginPageComponent,
      //canActivate: [() => authGuard(false)]  
    },
    {
      path: 'olvidaste-contrasenia',
      component: OlvidasteContraseniaComponent,
      canActivate: [() => authGuard(false)] // Solo permite acceso si NO está logueado. y me lleva a home
    },
    {
      path: 'home/:id',
      component: InicioPageComponent,
      canActivate : [() => authGuard(true)] // Solo permite acceso si está logueado
    },
    {
      path: 'preguntas-frecuentes',
      component: FaqComponent
    },
    {
      path: 'nosotros',
      component: NosotrosComponent
    },
    {
      path: 'contacto',
      component: ContactoComponent
    },
    {
      path: 'politicas-privacidad',
      component: PoliticasPrivacidadComponent
    },
    {
      path: 'terminos-servicio',
      component: TerminosServicioComponent
    },






    {
      path: 'perfil-trabajador/:id',
      component: PerfilTrabajadorComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {
      path: 'perfil-propio/:id',
      component: PerfilPropioComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {
      path: 'modificar/:id',
       component: ModificarPerfilComponent,
       canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    { path: 'notificaciones',
      component: NotificacionesPageComponent,
       canActivate : [authGuard] //SI ESTOY LOGEADO

    },

    {
      path: 'realizar-reserva/:id',
      component: AltaBajaPageComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {
      path: '**',
      redirectTo:'login'
    }
];
