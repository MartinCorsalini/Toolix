import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-public',
  standalone: true,
  imports: [],
  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css'
})
export class NavbarPublicComponent {

  logoUrl: string = 'assets/images/logo.jpeg';

}
