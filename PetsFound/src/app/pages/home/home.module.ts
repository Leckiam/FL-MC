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
import { QrgenerateComponent } from 'src/app/components/home/qrgenerate/qrgenerate.component';
import { QRCodeModule } from 'angularx-qrcode';
import { EditarmascotaComponent } from 'src/app/components/home/editarmascota/editarmascota.component';
import { CambiarcontraComponent } from 'src/app/components/home/cambiarcontra/cambiarcontra.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    QRCodeModule
  ],
  declarations: [HomePage,AccountComponent,InicioComponent,
    AgregarMascotaComponent,EditarperfilComponent,
    QrgenerateComponent,EditarmascotaComponent,CambiarcontraComponent,
  ]
})
export class HomePageModule {}
