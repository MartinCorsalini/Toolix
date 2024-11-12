import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-public',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css'
})
export class NavbarPublicComponent {

  logoUrl: string = 'assets/images/logo.jpeg';

}
