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
import { ModificarReservaPageComponent } from './pages/modificar-reserva-page/modificar-reserva-page.component';
import { EliminarCuentaPageComponent } from './pages/eliminar-cuenta-page/eliminar-cuenta-page.component';
import { ListReservasAdminPageComponent } from './pages/list-reservas-admin-page/list-reservas-admin-page.component';
import { HomeAdminPageComponent } from './pages/home-admin-page/home-admin-page.component';
import { ModificarReservaAdminPageComponent } from './pages/modificar-reserva-admin-page/modificar-reserva-admin-page.component';
import { PerfilTrabajadorAdminPageComponent } from './pages/perfil-trabajador-admin-page/perfil-trabajador-admin-page.component';
import { EliminarCuentasAdminPageComponent } from './pages/eliminar-cuentas-admin-page/eliminar-cuentas-admin-page.component';
import { PerfilPropioAdminPageComponent } from './pages/perfil-propio-admin-page/perfil-propio-admin-page.component';
import { ModificarPerfilesAdminPageComponent } from './pages/modificar-perfiles-admin/modificar-perfiles-admin.component';
import { AltaBajaReservasAdminPageComponent } from './pages/alta-baja-reservas-admin-page/alta-baja-reservas-admin-page.component';
import { FaqAdminPageComponent } from './pages/faq-admin-page/faq-admin-page.component';
import { NosotrosAdminComponent } from './component/nosotros-admin/nosotros-admin.component';






export const appRoutes: Routes = [
    {
      path: 'login',
      component: LoginPageComponent,
      canActivate: [() => authGuard(false)]
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

       path: 'modificar-reserva/:id/:trabajadorId',
        component: ModificarReservaPageComponent,
       canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {

      path: 'eliminar-cuenta/:id',
       component: EliminarCuentaPageComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
   },

   

   /// ADMIN
   {

      path: 'lista-reservas-admin',
      component: ListReservasAdminPageComponent,
      canActivate : [authGuard] //SI ESTOY LOGEADO
    },
    {
      path: 'homeAdmin/:id',
      component: HomeAdminPageComponent,
      canActivate : [authGuard]
    },
    {
      path: 'modificar-reserva-admin/:id',
      component: ModificarReservaAdminPageComponent,
      canActivate : [authGuard]
    },
    {
      path: 'perfil-trabajador-admin/:id',
      component: PerfilTrabajadorAdminPageComponent,
      canActivate : [authGuard]
    },
    {
      path: 'eliminar-cuentas-admin/:id',
      component: EliminarCuentasAdminPageComponent,
      canActivate : [authGuard]
    },
    {
      path: 'perfil-propio-admin/:id',
      component: PerfilPropioAdminPageComponent,
      canActivate : [authGuard]
    },
    {
      path: 'modificar-perfiles-admin/:id',
      component: ModificarPerfilesAdminPageComponent,
      canActivate : [authGuard]
    },
    {
      path: 'alta-baja-admin/:id',
      component: AltaBajaReservasAdminPageComponent,
      canActivate : [authGuard]
    },
    {
      path: 'faq-admin',
      component: FaqAdminPageComponent,
      canActivate : [authGuard]
    },
    {
      path: 'nosotros-admin',
      component: NosotrosAdminComponent,
      canActivate : [authGuard]
    },
    {
      path: '**',
      redirectTo:'login'
    }
];
