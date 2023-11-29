import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AccountComponent } from 'src/app/components/home/account/account.component';
import { InicioComponent } from 'src/app/components/home/inicio/inicio.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { AgregarMascotaComponent } from 'src/app/components/home/agregar-mascota/agregar-mascota.component';
import { EditarperfilComponent } from 'src/app/components/home/editarperfil/editarperfil.component';
import { QrgenerateComponent } from 'src/app/components/home/qrgenerate/qrgenerate.component';
import { CambiarcontraComponent } from 'src/app/components/home/cambiarcontra/cambiarcontra.component';
import { EditarmascotaComponent } from 'src/app/components/home/editarmascota/editarmascota.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: '',
        component: InicioComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'addPets',
        component: AgregarMascotaComponent,
      },
      {
        path: 'editarperfil',
        component: EditarperfilComponent,
      },
      {
        path: 'generate-qr',
        component: QrgenerateComponent,
      },

      {
        path: 'cambiarcontra',
        component: CambiarcontraComponent,
      },

      {
        path: 'editarMascota',
        component: EditarmascotaComponent,
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

