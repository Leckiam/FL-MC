import { Component } from '@angular/core';


export class Mascota {
  nombre: string;
  tipo: string;
  edad: number;
  descripcion: string;

  constructor() {
    this.nombre = '';
    this.tipo = '';
    this.edad = 0;
    this.descripcion = '';
  }
}

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.scss'],
})
export class AgregarMascotaComponent {
  mascota: Mascota = new Mascota();  // Crea una instancia de Mascota para el formulario

  constructor() {}

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
      mascota.tipo && mascota.tipo.length >= 1 &&
      mascota.edad && mascota.edad > 0 &&
      mascota.descripcion
    ) {
      return true;
    } else {
      return false;
    }
  }
}
