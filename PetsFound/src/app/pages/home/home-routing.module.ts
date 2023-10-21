import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AccountComponent } from 'src/app/components/home/account/account.component';
import { InicioComponent } from 'src/app/components/home/inicio/inicio.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: '',
        component: InicioComponent,
      },
    ],
    canActivate:[AuthGuard],
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

