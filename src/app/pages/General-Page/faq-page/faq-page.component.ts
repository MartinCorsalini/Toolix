import { Component } from '@angular/core';
import { FaqComponent } from "../../../component/generales/faq/faq.component";

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [FaqComponent],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.css'
})
export class FaqPageComponent {

}
