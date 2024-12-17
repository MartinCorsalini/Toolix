import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../../service/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../interface/usuario';
import { NavbarPrivateComponent } from "../../../shared/navbar-private/navbar-private.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-propio',
  standalone: true,
  imports: [NavbarPrivateComponent,RouterLink,CommonModule],
  templateUrl: './perfil-propio.component.html',
  styleUrl: './perfil-propio.component.css'
})
export class PerfilPropioComponent implements OnInit{

  ngOnInit(): void {
    this.accederAlosDatos();
  }

  fotoUrl = 'assets/avatar/avatar.png';  // Ruta de la foto de perfil
  usuario?: Usuario;
  id : string | null = null;

  valoracion: number | null = null;       // Valor de la valoración
  stars: number[] = [];
  promedio :number= 0;

  service= inject(UsuariosService);
  ar= inject(ActivatedRoute);
  router = inject(Router);

  selectedFile?: File;          // Almacena el archivo seleccionado
  selectedFileBase64?: string;  // Almacena la representación Base64
  

   // Calcula el promedio de valoraciones
   calcularPromedioValoracion() {
    if (this.usuario?.valoraciones?.length) {
      const suma = this.usuario.valoraciones.reduce((acc, val) => acc + val, 0);
      this.promedio= suma / this.usuario.valoraciones.length;
      console.log('Promedio:'+ this.promedio);
    }
    else
    {
      console.log('Error al carlcular el promedio');
    }

  }

    // Convierte el promedio en estrellas llenas, medias y vacías
    actualizarEstrellas() {
      const promedio = this.promedio / 2; // Promedio en una escala de 5
      const estrellasLlenas = Math.floor(promedio);
      const mediaEstrella = promedio % 1 >= 0.5 ? 1 : 0;
      const estrellasVacias = 5 - estrellasLlenas - mediaEstrella;

      this.stars = [
        ...Array(estrellasLlenas).fill(1),  // Estrellas llenas
        ...Array(mediaEstrella).fill(0.5),  // Media estrella (si aplica)
        ...Array(estrellasVacias).fill(0),  // Estrellas vacías
      ];
    }

  accederAlosDatos()
    {
      this.ar.paramMap.subscribe(
        {
          next: (param)=>
          {
              this.id = param.get('id');
              this.getById()
          },
          error: ()=>{
            alert('Error al acceder a los datos');
          }
        }
      )
    }

    getById()
    {
      this.service.getUsuarioById(this.id).subscribe(
        {
          next: (usuario : Usuario)=>
          {
            this.usuario = usuario;
            this.fotoUrl = usuario.fotoPerfil || 'assets/avatar/avatar.png'; // Usa la foto subida o una predeterminada
            this.calcularPromedioValoracion();
            this.actualizarEstrellas(); // Cálculo de estrellas al iniciar
          },
          error: () =>
          {
            alert('Error al acceder a los datos');
          }
        }
    )
    }

    irAModificar(id:string)
    {
      this.router.navigate([`modificar/${id}`]);
    }



    // ---------------FOTO DE PERFIL------------------------
      // Maneja el archivo seleccionado
      onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
          const file = input.files[0];
      
          // Validar tipo de archivo
          if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido.');
            return;
          }
      
          // Validar tamaño de archivo (por ejemplo, máximo 2 MB)
          if (file.size > 2000000) {
            alert('El archivo es demasiado grande. Seleccione uno menor a 2 MB.');
            return;
          }
      
          this.selectedFile = file; // Almacena el archivo seleccionado
      
          const reader = new FileReader();
          reader.onload = () => {
            this.selectedFileBase64 = reader.result as string; // Almacena el string Base64
          };
      
          reader.readAsDataURL(file); // Convierte el archivo a Base64
        }
      }
      


  // Subir la foto de perfil
  uploadPhoto(): void {
    if (this.selectedFileBase64 && this.id) {
      this.service.actualizarFotoPerfil(this.id, this.selectedFileBase64).subscribe({
        next: (usuarioActualizado: Usuario) => {
          this.usuario = usuarioActualizado;
          this.fotoUrl = usuarioActualizado.fotoPerfil || 'assets/avatar/avatar.png'; // Actualiza la vista
          alert('Foto de perfil actualizada con éxito');
        },
        error: () => {
          alert('Error al subir la foto de perfil');
        }
      });
    } else {
      alert('Por favor selecciona un archivo antes de subirlo.');
    }
  }

  
   
}
