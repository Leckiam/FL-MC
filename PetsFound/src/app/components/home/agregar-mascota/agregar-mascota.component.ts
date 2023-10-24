import { Component } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { Mascota } from 'src/app/class/mascota/mascota';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.scss'],
})
export class AgregarMascotaComponent {
  mascota: Mascota = new Mascota();  // Crea una instancia de Mascota para el formulario
  dueno: Dueno = new Dueno();  // Crea una instancia de Dueno para el formulario

  constructor(private homepage:HomePage) {
    this.mascota.nombre = '';
    this.mascota.raza = '';
    this.mascota.tipo = '';
    this.mascota.dueno = this.dueno;
    this.mascota.edad = 0;
    this.mascota.descripcion = '';
  }

  agregarMascota() {
    if (this.validarMascota(this.mascota)) {
      //  datos de la mascota son válidos, aqui creo que se agrega a la base de datos que vamos elegir eso creo (segun vi al video repaso xd)
      console.log('Nueva mascota:', this.mascota);

      // Limpia el formulario
      this.mascota = new Mascota(); 

     
    } else {
      console.log('Los datos de la mascota no son válidos. Verifica los campos.');
      //  mostrar un mensaje de error 
    }
  }

  validarMascota(mascota: Mascota): boolean {
    if (
      mascota.nombre && mascota.nombre.length >= 1 &&
      mascota.raza && mascota.dueno &&
      mascota.edad && mascota.edad > 0 &&
      mascota.descripcion
    ) {
      return true;
    } else {
      return false;
    }
  }
  ionViewWillEnter() {
    this.homepage.changeHeader(false,'Agregar Mascota');
  }
}
