import { inject } from "@angular/core"
import { Router } from "@angular/router"



// TODO ESTE ARCHIVO LO TENGO QUE BORRAR, ya que quedo todo en el auth.guard

export const authGuardLogout = ()=>{

    const router = inject(Router);

    if(!localStorage.getItem('token'))
    { //Acá  va a preguntar si no tengo token. Si no tengo, quiere decir que no estoy logeado
      return true;
    }
    else
    {
      router.navigateByUrl('home')
      return false;
    }
}
