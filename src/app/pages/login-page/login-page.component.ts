import { Component } from '@angular/core';
import { LoginAnimationComponent } from '../../component/LOGIN/login-animation/login-animation.component';
import { NavbarPublicComponent } from "../../shared/navbar-public/navbar-public.component";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
  imports: [LoginAnimationComponent, NavbarPublicComponent]
})
export class LoginPageComponent {}
