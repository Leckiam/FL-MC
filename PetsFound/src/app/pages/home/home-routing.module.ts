import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AccountComponent } from 'src/app/components/home/account/account.component';
import { InicioComponent } from 'src/app/components/home/inicio/inicio.component';
import { AgregarMascotaComponent } from 'src/app/components/home/agregar-mascota/agregar-mascota.component';
import { EditarperfilComponent } from 'src/app/components/home/editarperfil/editarperfil.component';


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

      {
        path: 'addPets',
        component: AgregarMascotaComponent,
      },
      
      {
        path: 'editarperfil',
        component: EditarperfilComponent,
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

