import { Component, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../component/Inicio/search-bar/search-bar.component';
import { CardComponent } from '../../component/Inicio/card/card.component';
import { NavbarPublicComponent } from "../../shared/navbar-public/navbar-public.component";
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";
import { UsuariosService } from '../../service/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../interface/usuario';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../component/Inicio/cuadro-dialogo/cuadro-dialogo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [SearchBarComponent, NavbarPrivateComponent, CardComponent, CommonModule],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent implements OnInit {

  perfiles: Usuario[] = [];           // Todos los perfiles de usuarios
  perfilesFiltrados: Usuario[] = [];   // Perfiles filtrados según el término de búsqueda
  service = inject(UsuariosService);
  ar = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.cargarPerfiles();
  }

  // Carga todos los perfiles al inicializar el componente
  cargarPerfiles(): void {
    this.service.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.perfiles = usuarios;
        this.perfilesFiltrados = usuarios; // Inicialmente muestra todos los perfiles
      },
      error => {
        console.error('Error al cargar los perfiles:', error);
      }
    );
  }

  // Filtra los perfiles según el término de búsqueda
  filtrarPerfiles(profesion: string): void {
    const termino = profesion.toLowerCase();
    this.perfilesFiltrados = this.perfiles.filter(perfil =>
      perfil.profesion?.toLowerCase().includes(termino)
    );

    if (this.perfilesFiltrados.length === 0) {
      this.mostrarMSJError(); // Muestra el diálogo si no hay resultados
    }
  }

  resetFiltro(): void {
    this.perfilesFiltrados = this.perfiles; // Restablece la lista completa de perfiles
  }

  mostrarMSJError(){
    this.dialog.open(DialogoComponent, {
      panelClass: "custom-dialog-container",
      data: {
        message: 'No existen perfiles con esa profesión. Por favor, intente de nuevo.'
      }
    });
  }

   
}
