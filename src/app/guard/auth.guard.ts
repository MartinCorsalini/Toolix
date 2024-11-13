import { inject } from "@angular/core"
import { AuthService } from "../service/auth.service"
import { Router } from "@angular/router"



// ojo que esto es una arrowfunction y no una clase
export const authGuard = (requisito: boolean = true)=>{
  //Este guard verifica el método estaLogeado() del servicio AuthService,
  // que devuelve true si estoyLogeado es true o si existe un token en localStorage.
  //Si el usuario no está autenticado, el guard lo redirige a la página de login y bloquea el acceso a rutas protegidas.

    const authService = inject(AuthService)
    const router = inject(Router);

    const isAuthenticated = authService.estaLogeado(); // Verifica el estado de autenticación
    const userId = authService.getUserId(); // Obtén el userId del servicio de autenticación

    //Va al AuthService y se fija en que estado se encuentra el atributo "estoyLogeado"
    if(requisito && isAuthenticated)
    { // Si la ruta requiere autenticación y el usuario está autenticado
      return true;
    }
    else if (!requisito && !isAuthenticated)
    {// Si la ruta requiere NO estar autenticado y el usuario no está autenticado
       return true;
    }
    else
    {
       // Si el usuario NO cumple con el requisito de la ruta
        // Redirigimos según el caso:

        // Si la ruta requiere autenticación (requisito = true) pero el usuario NO está autenticado,
        // lo redirigimos a la página de `login`.
        // Si la ruta NO requiere autenticación (requisito = false) pero el usuario ESTÁ autenticado,
        // lo redirigimos a la página de `home`.
       const redirectRoute = requisito ? 'login' : `/home/${userId}`;
       // - Si requisito es true: La ruta requiere autenticación, pero el usuario no está autenticado. Por lo tanto, redirigimos a login.
       // - Si requisito es false: La ruta no debería permitir acceso a usuarios autenticados, pero el usuario ya está autenticado. Por lo tanto, redirigimos a home.
       router.navigateByUrl(redirectRoute);
       return false;// Bloquea el acceso a la ruta original
    }

}
