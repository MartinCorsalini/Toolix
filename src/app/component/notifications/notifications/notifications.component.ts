import { ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";
import { Reserva } from '../../../interface/reserva';
import { CommonModule } from '@angular/common';
import { AltaBajaReservaComponent } from "../../Reservas/alta-baja-reserva/alta-baja-reserva.component";
import { ReservasService } from '../../../service/reservas.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { UsuariosService } from '../../../service/usuarios.service';
import { Usuario } from '../../../interface/usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NavbarPrivateComponent,
    CommonModule,
    ReactiveFormsModule,
     AltaBajaReservaComponent,
     RouterModule,
     MatFormField,
     MatLabel,
      MatError,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
    ],

  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit{
   // Arreglos para almacenar reservas enviadas y recibidas por el usuario
  reservasEnviadas: Reserva[]=[];
  reservasRecibidas: Reserva[]=[];
  esTrabajador: boolean = false;// Estado que indica si el usuario tiene rol de "Trabajador"

   // NUEVO: Variables para manejar el pop-up de calificación
   mostrarPopup: boolean = false; // Controla si se muestra el pop-up
   calificacionForm!: FormGroup; // Formulario de calificación
   reservaSeleccionada: Reserva | null = null; // Reserva actualmente seleccionada para calificar

  // Estado que indica si el usuario tiene rol de "Trabajador"
  constructor(
    private user : AuthService,
    private reservasService: ReservasService,
    private dialog: MatDialog, // manejo de diálogos
    private router: Router,
    private cdr: ChangeDetectorRef,
    private service: UsuariosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {this.calificacionForm = this.fb.group({
    calificacion: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
  });}


  ngOnInit(): void {
    this.authService.currentUserId$.subscribe(id => {
      this.userId = id;
    });

    this.getById();
    this.cargarReservas();

    if (this.user.estaLogeado()) {
      // Si el usuario está autenticado, obtiene sus reservas
      this.reservasService.getReserva().subscribe((reservas) => {
        const userId = this.user.getUserId();

        const estadoOrden = { pendiente: 1, aceptada: 2, rechazada: 3, finalizada: 4};

        // Filtra y ordena reservas recibidas
        this.reservasRecibidas = reservas
          .filter(res => res.idTr === userId)
          .sort((a, b) => estadoOrden[a.estado] - estadoOrden[b.estado]);

        // Filtra y ordena reservas enviadas
        this.reservasEnviadas = reservas
          .filter(res => res.idUs === userId)
          .sort((a, b) => estadoOrden[a.estado] - estadoOrden[b.estado]);

        // Cargar nombres de clientes y trabajadores para cada reserva recibida
        this.reservasRecibidas.forEach((reserva) => {
          this.mostrarCliente(reserva.idUs!);
          this.mostrarTrabajador(reserva.idTr!);
        });

        // Cargar nombres de clientes y trabajadores para cada reserva enviada
        this.reservasEnviadas.forEach((reserva) => {
          this.mostrarCliente(reserva.idUs!);
          this.mostrarTrabajador(reserva.idTr!);
        });
      });

      // Recupera el rol del usuario y ajusta `esTrabajador` según corresponda
      this.esTrabajador = this.user.getUserRole() === 'Trabajador';
    } else {
      // Si no está logueado, redirige a la página de login
      this.router.navigate(['/login']);
    }
  }



  irAModificarReserva(reserva: Reserva){

    this.router.navigate(['modificar-reserva', reserva.id,reserva.idTr]);

  }

  irAModificarReservaAdmin(reserva: Reserva) {
    this.router.navigate(['/modificar-reserva-admin'], { state: { reserva } });
  }

  eliminarReserva(id: string | null ){
    this.reservasService.deleteReserva(id).subscribe(
      {
        next: () => {
          console.log('Eliminando');
           this.reservasEnviadas = this.reservasEnviadas.filter(res => res.id !== id);
          this.dialog.open(DialogoComponent, {
            panelClass: "custom-dialog-container",
            data: {
              message: "La reserva se ha eliminado correctamente"
            }
          });
        },
        error: (e: Error) => {
          console.log('Fallo eliminar');
        }
        });

  }

  //-------------------------------------AGREGADO------------------------------------
  // Finalizar una reserva
  finalizarReserva(reserva: Reserva) {
    reserva.estado = 'finalizada'; // Cambia el estado a "finalizado"
    this.reservasService.putReserva(reserva, reserva.id).subscribe({
      next: () => {
        this.dialog.open(DialogoComponent, {
          panelClass: "custom-dialog-container",
          data: { message: "Reserva finalizada correctamente" }
        });

        // Actualiza las reservas locales
        if (this.esTrabajador) {
          // Si es trabajador, actualiza reservas recibidas
          this.reservasRecibidas = this.reservasRecibidas.map(r =>
            r.id === reserva.id ? { ...r, estado: 'finalizada' } : r
          );
        } else {
          // Si es cliente, actualiza reservas enviadas
          this.reservasEnviadas = this.reservasEnviadas.map(r =>
            r.id === reserva.id ? { ...r, estado: 'finalizada' } : r
          );
        }
      },
      error: (e: Error) => {
        console.log('Error al finalizar la reserva');
      }
    });
  }


  //-------------------------------------AGREGADO- CALIFICAR RESERVA ------------------------------------
  // NUEVO: Método para abrir el pop-up de calificación
  abrirDialogoCalificacion(reserva: Reserva): void {
    this.reservaSeleccionada = reserva; // Establece la reserva actual
    this.calificacionForm.reset(); // Resetea el formulario
    this.mostrarPopup = true; // Muestra el pop-up
  }

  // NUEVO: Método para cerrar el pop-up de calificación
  cerrarPopup(): void {
    this.mostrarPopup = false;
    this.reservaSeleccionada = null;
  }

  // NUEVO: Método para enviar la calificación
  // Actualiza el método enviarCalificacion manteniendo toda la funcionalidad existente
enviarCalificacion(): void {
  if (this.calificacionForm.valid && this.reservaSeleccionada) {
    console.log('Formulario válido y reserva seleccionada:', this.calificacionForm.value);
    const calificacion = this.calificacionForm.value.calificacion;

    // Obtén el ID del trabajador (idTr) de la reserva seleccionada
    const idTrabajador = this.reservaSeleccionada.idTr;

    if (idTrabajador) {
      console.log(`Calificando al trabajador con ID: ${idTrabajador}`);

      // Verificar si la reserva ya fue calificada
      if (this.reservaSeleccionada.calificada) {
        this.dialog.open(DialogoComponent, {
          data: { message: 'Esta reserva ya ha sido calificada.' }
        });
        this.cerrarPopup();
        return;
      }

      // Llama al servicio para obtener el usuario completo (trabajador)
      this.service.getUsuarioById(idTrabajador).subscribe({
        next: (trabajador: Usuario) => {
          if (!trabajador.valoraciones) {
            trabajador.valoraciones = []; // Inicializa el array si está vacío
          }

          trabajador.valoraciones.push(calificacion); // Agrega la nueva calificación

          // Crea un objeto con el usuario completo, pero actualizando solo las valoraciones
          const usuarioActualizado: Usuario = {
            ...trabajador,  // Copia todos los campos del trabajador
            valoraciones: trabajador.valoraciones // Mantén las valoraciones actualizadas
          };

          // Llama al servicio para actualizar el usuario con las nuevas valoraciones
          this.service.putUsuario(usuarioActualizado, idTrabajador).subscribe({
            next: () => {
              console.log('Calificación guardada con éxito');

              // Actualizar el estado de calificación de la reserva
              const reservaActualizada = {
                ...this.reservaSeleccionada!,
                calificada: true
              };

              // Actualizar la reserva en el servidor
              this.reservasService.putReserva(reservaActualizada, this.reservaSeleccionada?.id!)
                .subscribe({
                  next: () => {
                    // Actualizar las reservas en el cliente
                    this.reservasEnviadas = this.reservasEnviadas.map(reserva =>
                      reserva.id === this.reservaSeleccionada?.id
                        ? { ...reserva, calificada: true }
                        : reserva
                    );

                    this.dialog.open(DialogoComponent, {
                      panelClass: "custom-dialog-container",
                      data: { message: 'Gracias por calificar la reserva.' }
                    });


                    this.cerrarPopup(); // Cierra el pop-up
                  },
                  error: (err) => {
                    console.error('Error al actualizar la reserva en el servidor:', err);
                    this.dialog.open(DialogoComponent, {
                      data: { message: 'Error al actualizar el estado de la reserva. La calificación se guardó pero puede aparecer disponible nuevamente.' }
                    });
                    this.cerrarPopup();
                  }
                });
            },
            error: () => {
              this.dialog.open(DialogoComponent, {
                data: { message: 'Error al guardar la calificación. Inténtalo nuevamente.' }
              });
            }
          });
        },
        error: () => {
          this.dialog.open(DialogoComponent, {
            data: { message: 'No se pudo encontrar al trabajador asociado a la reserva.' }
          });
        }
      });
    }
  }
}

  // Aceptar una reserva
  aceptarReserva(reserva: Reserva) {
    reserva.estado = 'aceptada'; // Cambia el estado a "aceptada"
    this.reservasService.putReserva(reserva, reserva.id).subscribe({
      next: () => {
        this.dialog.open(DialogoComponent, {
          panelClass: "custom-dialog-container",
          data: { message: "Reserva aceptada correctamente" }
        });
      },
      error: (e: Error) => {
        console.log('Error al aceptar la reserva');
      }
    });
  }

  // Rechazar una reserva
  rechazarReserva(reserva: Reserva)
  {
    reserva.estado = 'rechazada'; // Cambia el estado a "rechazada"
    this.reservasService.putReserva(reserva, reserva.id).subscribe({
      next: () => {
        this.dialog.open(DialogoComponent, {
          panelClass: "custom-dialog-container",
          data: { message: "Reserva rechazada correctamente" }
        });
        //this.reservasRecibidas = this.reservasRecibidas.filter(res => res.id !== reserva.id);
      },
      error: (e: Error) => {
        console.log('Error al rechazar la reserva');
      }
    });
}



  //-------------FUNCIONES PARA MOSTRAR LOS DATOS DE LOS USUARIOS ---------------------


  usuarioNombres: { [id: string]: string } = {}; // Almacena los nombres de usuario por id


  mostrarCliente(id: string) {
    console.log('ENTRE A LA FUNCION MOSTRAR CLIENTE');
    this.service.getUsuarioById(id).subscribe({
      next: (usuario: Usuario) => {
        console.log('ID USUARIO RESERVA: '+usuario.nombre);
        this.usuarioNombres[id] = usuario.nombre;
      },
      error: () => {
        console.log('Error al cargar el nombre del cliente');
        this.usuarioNombres[id] = 'Error al cargar nombre';
      }
    });
  }

  trabajadorNombres: { [id: string]: string } = {}; // Almacena los nombres de los trabajadores por id

  mostrarTrabajador(id: string) {
    console.log('ENTRE A LA FUNCION MOSTRAR TRABAJADOR');

    this.service.getUsuarioById(id).subscribe({
      next: (usuario: Usuario) => {
        console.log('ID TRABAJADOR RESERVA: ' + usuario.nombre);
        this.trabajadorNombres[id] = usuario.nombre;
        this.cdr.detectChanges(); // Fuerza la actualización de la vista
      },
      error: () => {
        console.log('Error al cargar el nombre del trabajador');
        this.trabajadorNombres[id] = 'Error al cargar nombre';
        this.cdr.detectChanges(); // Actualiza la vista en caso de error
      }
    });
  }




  //SACADO DE NOTIFICACION ADMIN:

  reservas: Reserva[]=[];

  cargarReservas() {
    this.reservasService.getReserva().subscribe({
      next: (reservas: Reserva[]) => {
       // this.reservas = reservas; // Asigna las reservas obtenidas del servidor
       this.reservas = reservas.sort((a, b) => {
        const estadoOrden = { pendiente: 1, aceptada: 2, rechazada: 3, finalizada: 4 };
        return estadoOrden[a.estado] - estadoOrden[b.estado];
      });
      },
     error: (e : Error) => {
        console.log('Error al cargar las reservas', e.message);
      }
    }

    );
  }

  usuario?: Usuario;
  userRol : string | undefined;
  userId: string | undefined = undefined;


  getById()
  {
    this.service.getUsuarioById(this.userId!).subscribe(
      {
        next: (usuario : Usuario)=>
        {
          this.usuario = usuario;
          this.userRol = usuario.rol;
          console.log('ROOOOL 2: '+ this.userRol);
        },
        error: () =>
        {
          alert('Error al acceder a los datos');
        }
      }
  )
  }

}





