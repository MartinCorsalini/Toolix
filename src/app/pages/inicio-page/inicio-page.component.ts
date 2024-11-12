import { Component } from '@angular/core';
import { SearchBarComponent } from '../../component/Inicio/search-bar/search-bar.component';
import { CardComponent } from '../../component/Inicio/card/card.component';
import { GridComponent } from '../../component/Inicio/grid/grid.component';
import { NavbarPublicComponent } from "../../shared/navbar-public/navbar-public.component";
import { NavbarPrivateComponent } from "../../shared/navbar-private/navbar-private.component";


@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [SearchBarComponent, GridComponent, NavbarPublicComponent, NavbarPrivateComponent],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent {

}
