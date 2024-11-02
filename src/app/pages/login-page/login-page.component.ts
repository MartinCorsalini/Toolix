import { Component } from '@angular/core';
import { LoginAnimationComponent } from '../../component/LOGIN/login-animation/login-animation.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
  imports: [LoginAnimationComponent]
})
export class LoginPageComponent {}
