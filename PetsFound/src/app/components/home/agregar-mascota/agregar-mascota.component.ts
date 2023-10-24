import { Component } from '@angular/core';
import { DogApiService } from 'src/app/services/dog-api.service';
import { Mascota } from 'src/app/class/mascota';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.scss'],
})
export class AgregarMascotaComponent {
  
  mascota: Mascota = new Mascota();                                                        
  razasPerro: string[] = [];


  constructor(public dogApiService: DogApiService, private petsService: PetsService) {
    this.dogApiService.razaDog().subscribe((response: any) => {
      if (response && response.message) {
        // Las razas de perro están en response.message
        this.razasPerro = Object.keys(response.message);
      }
    });

    this.mascota.nombre = '';
    this.mascota.raza = '';
    this.mascota.tipo = '';
    this.mascota.edad = 0;
    this.mascota.descripcion = '';
  }

  

  agregarMascota() {
    if (this.validarMascota(this.mascota)) {
      //  datos de la mascota son válidos, aqui creo que se agrega a la base de datos que vamos elegir eso creo (segun vi al video repaso xd)
      this.petsService.agregarMascota(this.mascota);

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
      mascota.edad && mascota.edad > 0 &&
      mascota.descripcion
    ) {
      return true;
    } else {
      return false;
    }
  }
}
