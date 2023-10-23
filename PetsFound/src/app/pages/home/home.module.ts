import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AccountComponent } from 'src/app/components/home/account/account.component';
import { InicioComponent } from 'src/app/components/home/inicio/inicio.component';
import { AgregarMascotaComponent } from 'src/app/components/home/agregar-mascota/agregar-mascota.component';
import { EditarperfilComponent } from 'src/app/components/home/editarperfil/editarperfil.component';
import { MessageComponent } from 'src/app/components/home/message/message.component';
import { UsersComponent } from 'src/app/components/administrador/crud/users/users/users.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,AccountComponent,InicioComponent,
    AgregarMascotaComponent,EditarperfilComponent,MessageComponent,
    UsersComponent
  ]
})
export class HomePageModule {}
