import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AgregarMascotaComponent } from 'src/app/components/agregar-mascota/agregar-mascota.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
    {
      path: 'agregar-mascota',
      component: AgregarMascotaComponent,
    },
  
   ]
 }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

