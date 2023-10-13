import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { RegisterComponent } from 'src/app/components/login/register/register.component';
import { RecoverpassComponent } from 'src/app/components/login/recoverpass/recoverpass.component';
import { LogincompComponent } from 'src/app/components/login/logincomp/logincomp.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children:[
      {
        path: '',
        component: LogincompComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'recoverpass',
        component: RecoverpassComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}

