import { Routes } from '@angular/router';

//?-----------------------------------------------GENERALES----------------------------------------
import { NosotrosPageComponent } from './pages/General-Page/nosotros-page/nosotros-page.component';
import { ContactoPageComponent } from './pages/General-Page/contacto-page/contacto-page.component';
import { PoliticasPrivacidadPageComponent } from './pages/General-Page/politicas-privacidad-page/politicas-privacidad-page.component';
import { TerminosServicioPageComponent } from './pages/General-Page/terminos-servicio-page/terminos-servicio-page.component';
import { FaqPageComponent } from './pages/General-Page/faq-page/faq-page.component';

//?-----------------LOGIN Y REGISTER-----------------------------
import { IniciarSesionPageComponent } from './pages/login-page/iniciar-sesion-page/iniciar-sesion-page.component';
import { OlvidasteContraseniaPageComponent } from './pages/login-page/olvidaste-contrasenia-page/olvidaste-contrasenia-page.component';

//?------------------------------------PERFIL-----------------------------
import { PerfilPropioPageComponent } from './pages/Perfil-Page/perfil-propio-page/perfil-propio-page.component';
import { PerfilTrabajadorPageComponent } from './pages/Perfil-Page/perfil-trabajador-page/perfil-trabajador-page.component';
import { EliminarCuentaPageComponent } from './pages/Perfil-Page/eliminar-cuenta-page/eliminar-cuenta-page.component';
import { ModificarPerfilPageComponent } from './pages/Perfil-Page/modificar-perfil-page/modificar-perfil-page.component';


//?-------------------------------NOTIFICACIONES-----------------------------
import { NotificacionesPageComponent } from './pages/notificaciones-page/notificaciones-page.component';

//?-----------------------------------------RESERVAS-----------------------------
import { AltaBajaPageComponent } from './pages/Reservas-Page/alta-baja-page/alta-baja-page.component';
import { ModificarReservaPageComponent } from './pages/Reservas-Page/modificar-reserva-page/modificar-reserva-page.component';

//?---------------------------------INICIO-----------------------------
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';

//?------------------------------AUTH GUARD-----------------------------
import { authGuard } from './guard/auth.guard';
import { FavoritosComponent } from './component/favoritos/favoritos.component';








export const appRoutes: Routes = [
    {
      //?------------------------LOGIN-----------------------------
      path: 'login',
      component: IniciarSesionPageComponent,
      canActivate: [() => authGuard(false)]
    },
    {
      path: 'olvidaste-contrasenia',
      component: OlvidasteContraseniaPageComponent,
      canActivate: [() => authGuard(false)] // Solo permite acceso si NO está logueado. y me lleva a home
    },


    {
      //?------------------------------------INICIO-----------------------------
      path: 'home/:id',
      component: InicioPageComponent,
      canActivate : [() => authGuard(true)] // Solo permite acceso si está logueado
    },


    {
      //?-----------------------------------GENERALES-----------------------------
      path: 'preguntas-frecuentes',
      component: FaqPageComponent
    },
    {
      path: 'nosotros',
      component: NosotrosPageComponent
    },
    {
      path: 'contacto',
      component: ContactoPageComponent
    },
    {
      path: 'politicas-privacidad',
      component: PoliticasPrivacidadPageComponent
    },
    {
      path: 'terminos-servicio',
      component: TerminosServicioPageComponent
    },


    //?----------------------------PERFIL-----------------------------
    {
      path: 'perfil-trabajador/:id',
      component: PerfilTrabajadorPageComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {
      path: 'perfil-propio/:id',
      component: PerfilPropioPageComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {
      path: 'modificar/:id',
       component: ModificarPerfilPageComponent,
       canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {
      path: 'eliminar-cuenta/:id',
       component: EliminarCuentaPageComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
   },


    //?----------------------------NOTIFICACIONES-----------------------------
    { path: 'notificaciones',
      component: NotificacionesPageComponent,
       canActivate : [authGuard] //SI ESTOY LOGEADO
    },


        //?-------------------------------RESERVA--------------------------------
    {
      path: 'realizar-reserva/:id',
      component: AltaBajaPageComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {
       path: 'modificar-reserva/:id/:trabajadorId',
        component: ModificarReservaPageComponent,
       canActivate : [authGuard] //SI ESTOY LOGEADO
    },

     //?------------------------------- FAVORITOS --------------------------------
     {
      path: 'favoritos',
      component: FavoritosComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
    },

    //?------------------------------- CUALQUIER OTRA COSA --------------------------------
    {
      path: '**',
      redirectTo:'login'
    },



];
