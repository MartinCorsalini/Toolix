import { Component } from '@angular/core';
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NavbarPrivateComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
