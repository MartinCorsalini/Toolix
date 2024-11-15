import { Component } from '@angular/core';
import { ListReservasAdminComponent } from "../../component/list-reservas-admin/list-reservas-admin.component";

@Component({
  selector: 'app-list-reservas-admin-page',
  standalone: true,
  imports: [ListReservasAdminComponent],
  templateUrl: './list-reservas-admin-page.component.html',
  styleUrl: './list-reservas-admin-page.component.css'
})
export class ListReservasAdminPageComponent {

}
