import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RegisterComponent } from 'src/app/components/login/register/register.component';
import { RecoverpassComponent } from 'src/app/components/login/recoverpass/recoverpass.component';
import { LogincompComponent } from 'src/app/components/login/logincomp/logincomp.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage,LogincompComponent,RegisterComponent,RecoverpassComponent]
})
export class LoginPageModule {}
