import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotsfoundPageRoutingModule } from './notsfound-routing.module';

import { NotsfoundPage } from './notsfound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotsfoundPageRoutingModule
  ],
  declarations: [NotsfoundPage]
})
export class NotsfoundPageModule {}
