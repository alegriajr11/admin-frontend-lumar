import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path: 'verification',
    component: CodeVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
