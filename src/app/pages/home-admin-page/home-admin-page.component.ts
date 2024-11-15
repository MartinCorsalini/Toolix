import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../../shared/navbar-admin/navbar-admin.component";
import { SearchBarComponent } from "../../component/Inicio/search-bar/search-bar.component";
import { HomeAdminComponent } from "../../component/home-admin/home-admin.component";

@Component({
  selector: 'app-home-admin-page',
  standalone: true,
  imports: [NavbarAdminComponent, SearchBarComponent, HomeAdminComponent],
  templateUrl: './home-admin-page.component.html',
  styleUrl: './home-admin-page.component.css'
})
export class HomeAdminPageComponent {

}
