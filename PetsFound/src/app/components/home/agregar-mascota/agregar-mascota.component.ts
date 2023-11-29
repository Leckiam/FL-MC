import { Component } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { Mascota } from 'src/app/class/mascota/mascota';
import { HomePage } from 'src/app/pages/home/home.page';
import { ApidogsService } from 'src/app/services/api/dogs/apidogs.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.scss'],
})
export class AgregarMascotaComponent {

  mascota: Mascota = new Mascota();  // Crea una instancia de Mascota para el formulario
  razasDogs:string[]= [];
  dueno: Dueno = new Dueno();  // Crea una instancia de Dueno para el formulario

  constructor(public dogApiService: ApidogsService, public homepage:HomePage,private method:MethodService,
    private fireBase:FirebaseService) {

    this.dueno = this.homepage.dueno;
    this.dogApiService.razaDog().subscribe((response: any) => {
      if (response && response.message) {
        // Las razas de perro están en response.message
        this.razasDogs = Object.keys(response.message);
      }
    });
    this.mascota.nombre = '';
    this.mascota.raza = '';
    this.mascota.idDueno = this.dueno.id;
    this.mascota.tipo = '';
    this.mascota.edad = 0;
    this.mascota.descripcion = '';
  }

  async agregarMascota() {
    if (this.validarMascota(this.mascota)) {
      this.fireBase.addMascota(this.mascota.idDueno,this.mascota.nombre,this.mascota.tipo,this.mascota.edad,this.mascota.descripcion,this.mascota.raza);
      await this.fireBase.obtPets(this.dueno.id);
      this.homepage.mascotas = JSON.parse(localStorage.getItem('mascotas')||"[]");
      console.log(this.homepage.mascotas.length)
      console.log('Nueva mascota:', JSON.stringify(this.mascota));
      this.method.presentToast('top','Se ha añadido su mascota '+ this.mascota.nombre +' con exito')
      // Limpia el formulario
      this.mascota = new Mascota();
      this.mascota.idDueno = this.dueno.id;

     
    } else {
      console.log('Mascota:', JSON.stringify(this.mascota));
      console.log('Los datos de la mascota no son válidos. Verifica los campos.');
      //  mostrar un mensaje de error 
    }
  }

  validarMascota(mascota: Mascota): boolean {
    if (
      mascota.nombre && mascota.nombre.length >= 4 &&
      mascota.idDueno &&
      mascota.edad && mascota.edad > 0 &&
      mascota.descripcion
    ) {
      return true;
    } else {
      return false;
    }
  }
  ionViewWillEnter() {
    this.homepage.changeHeader(true,'Agregar Mascota');
  }
}
