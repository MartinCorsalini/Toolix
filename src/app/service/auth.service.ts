import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //-------------------MANEJO DEL USER ID --------------------
  idUsuario = new BehaviorSubject<string | undefined>(undefined);
  currentUserId$ = this.idUsuario.asObservable();
  //----------------------------------------------------------
  private usuarioActual!: Usuario;
  estoyLogeado: boolean = false

  constructor(private usuariosService: UsuariosService) { // Hecho en el constructor así cada vez que se genera una nueva insatcnia del servicio (como recargar la página) re-autentique al usuario loggeado.

     // Restaurar el ESTADO de autenticación desde localStorage
     this.estoyLogeado = !!localStorage.getItem('token');
     const storedUserId = localStorage.getItem('userId');
 
     if (this.estoyLogeado && storedUserId) {
       this.idUsuario.next(storedUserId);
 
       // Restaurar al USUARIO ACTUAL
       this.usuariosService.getUsuarioById(storedUserId).subscribe((usuario: Usuario) => {
         this.usuarioActual = usuario;

          // Asegurarse de que userRole se actualice después de obtener el usuario
       if (usuario.rol) {
        localStorage.setItem('userRole', usuario.rol);
      }
       });
     }
  }
  //Cuando llamas a logIn(), la variable estoyLogeado se establece en true
  // y se guarda un token en localStorage.
  //Esto asegura que el usuario siga autenticado incluso si recarga la página.
  logIn(userId: string)
  {
    this.usuariosService.getUsuarioById(userId).subscribe((usuario: Usuario) => {
      this.usuarioActual = usuario;

    });

    this.estoyLogeado = true;
    this.idUsuario.next(userId);

    localStorage.setItem('token', '123.456'); // Guarda el token en localStorage
    localStorage.setItem('userId', userId); // Guarda el userId en localStorage
    localStorage.setItem('userRole', this.usuarioActual?.rol);


    console.log("Usuario logueado:", this.estoyLogeado); // Log para verificar que el usuario está logueado
    console.log("User ID guardado:", userId);
  }

  //Cuando llamas a LogOut(), estoyLogeado se establece en false
  // y el token se elimina de localStorage.
  //Esto asegura que el usuario quede completamente desconectado.
  LogOut() {
    this.estoyLogeado = false;
    this.idUsuario.next(undefined);

    localStorage.removeItem('token'); // Elimina el token de localStorage al cerrar sesión
    localStorage.removeItem('userId'); // Elimina el userId de localStorage
    localStorage.removeItem('userRole'); // Elimina el userRole de localStorage

    console.log("Usuario deslogueado:", this.estoyLogeado); // Log para verificar que el usuario está deslogueado
  }

  // Método que verifica si el usuario está autenticado
  estaLogeado(): boolean
  {
    const isAuthenticated = this.estoyLogeado || !!localStorage.getItem('token');
    // Verifica si `estoyLogeado` es true o si hay un token en `localStorage`
    console.log("Verificación de autenticación:", isAuthenticated); // Log para mostrar el estado de autenticación actual
   // Si el usuario tiene un token en localStorage, también recuperamos el userId

    if (isAuthenticated && !this.idUsuario.getValue()) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.idUsuario.next(storedUserId); // Recupera el userId almacenado
      }
    }

    return isAuthenticated;

  }

  // Método para obtener el ID actual del usuarioo
  getUserId(): string | undefined {
    return this.idUsuario.getValue();
  }

  getUserRole(): string | undefined {
    return this.usuarioActual?.rol || localStorage.getItem('userRole') || undefined;
  }


  // FAVORITOS
  agregarFavorito(id: string) {
    if (this.usuarioActual && !this.usuarioActual.favoritos?.includes(id)) {
      this.usuarioActual.favoritos?.push(id);
    }
  }

  eliminarFavorito(id: string) {
    if (this.usuarioActual) {
      this.usuarioActual.favoritos = this.usuarioActual.favoritos?.filter(
        (favoritoId) => favoritoId !== id
      );
    }
  }

  getFavoritos() {
    return this.usuarioActual ? this.usuarioActual.favoritos : [];
  }
}
