import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverpassPageRoutingModule } from './recoverpass-routing.module';

import { RecoverpassPage } from './recoverpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverpassPageRoutingModule
  ],
  declarations: [RecoverpassPage]
})
export class RecoverpassPageModule {}
