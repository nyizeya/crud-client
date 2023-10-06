import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ErrorComponent } from './error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    LoginComponent
  ]
})
export class SharedModule { }
