import { Component } from '@angular/core';
import { SearchBarComponent } from "../../search-bar/search-bar.component";
import { CardComponent } from "../../card/card.component";

@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [SearchBarComponent, CardComponent],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent {

}
