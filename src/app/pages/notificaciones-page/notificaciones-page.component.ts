import { Component } from '@angular/core';
import { NotificationsComponent } from '../../component/notifications/notifications/notifications.component';

@Component({
  selector: 'app-notificaciones-page',
  standalone: true,
  imports: [NotificationsComponent],
  templateUrl: './notificaciones-page.component.html',
  styleUrl: './notificaciones-page.component.css'
})
export class NotificacionesPageComponent {

}
