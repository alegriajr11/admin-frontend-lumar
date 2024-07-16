import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../shared/shared.module';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { ToastrModule } from 'ngx-toastr';
import { NameUserComponent } from './name-user/name-user.component';


@NgModule({
  declarations: [LoginComponent, CodeVerificationComponent, NameUserComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot()
  ]
})
export class AuthModule { }
