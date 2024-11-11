import { Component } from '@angular/core';
import { SearchBarComponent } from '../../component/Inicio/search-bar/search-bar.component';
import { CardComponent } from '../../component/Inicio/card/card.component';
import { GridComponent } from '../../component/Inicio/grid/grid.component';


@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [SearchBarComponent, GridComponent],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent {

}
