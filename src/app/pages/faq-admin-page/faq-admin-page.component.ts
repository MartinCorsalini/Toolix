import { Component } from '@angular/core';
import { FaqAdminComponent } from "../../component/faq-admin/faq-admin.component";

@Component({
  selector: 'app-faq-admin-page',
  standalone: true,
  imports: [FaqAdminComponent],
  templateUrl: './faq-admin-page.component.html',
  styleUrl: './faq-admin-page.component.css'
})
export class FaqAdminPageComponent {

}
