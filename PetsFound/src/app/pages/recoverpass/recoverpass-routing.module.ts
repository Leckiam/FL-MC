import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverpassPage } from './recoverpass.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverpassPageRoutingModule {}
