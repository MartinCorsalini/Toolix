import { Component } from '@angular/core';
import { ListUsuariosAdminComponent } from "../../component/list-usuarios-admin/list-usuarios-admin.component";
import { NavbarAdminComponent } from "../../shared/navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-list-usuarios-admin-page',
  standalone: true,
  imports: [ListUsuariosAdminComponent, NavbarAdminComponent],
  templateUrl: './list-usuarios-admin-page.component.html',
  styleUrl: './list-usuarios-admin-page.component.css'
})
export class ListUsuariosAdminPageComponent {

}
