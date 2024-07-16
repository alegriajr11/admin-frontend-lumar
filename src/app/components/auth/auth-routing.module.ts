import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { NameUserComponent } from './name-user/name-user.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path: 'verification',
    component: CodeVerificationComponent
  },
  {
    path: 'user-name',
    component: NameUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
