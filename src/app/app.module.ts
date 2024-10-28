import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './component/login-register/login-register.component';// Ajusta el path
import { OlvidasteContraseniaComponent } from './component/olvidaste-contrasenia/olvidaste-contrasenia.component';// Ajusta el path
import { NavbarComponent } from './component/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    OlvidasteContraseniaComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    Router,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
