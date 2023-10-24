import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotsfoundPage } from './notsfound.page';

const routes: Routes = [
  {
    path: '',
    component: NotsfoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotsfoundPageRoutingModule {}
