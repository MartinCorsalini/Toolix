import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarPrivateComponent } from '../../../shared/navbar-private/navbar-private.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule,NavbarPrivateComponent],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqList = [
    { Pregunta: '¿Cómo puedo registrarme?', Respuesta: 'Para registrarte, ve a la página de registro y completa el formulario.', open: false },
    { Pregunta: '¿Cómo restablezco mi contraseña?', Respuesta: 'Puedes restablecer tu contraseña haciendo clic en "Olvidaste tu contraseña" en la página de inicio de sesión.', open: false },
    { Pregunta: '¿Dónde encuentro mis configuraciones de cuenta?', Respuesta: 'Las configuraciones de cuenta están en el menú superior, bajo "Configuración".', open: false }
  ];

  toggleRespuesta(item: any) {
    item.open = !item.open;
  }
}
