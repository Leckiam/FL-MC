import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { Mascota } from 'src/app/class/mascota/mascota';
import { ApidogsService } from 'src/app/services/api/dogs/apidogs.service';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';
import { ApiduenosService } from 'src/app/services/api/duenos/apiduenos.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-editarmascota',
  templateUrl: './editarmascota.component.html',
  styleUrls: ['./editarmascota.component.scss'],
})
export class EditarmascotaComponent  implements OnInit {
  Id: String; 
  mascota:Mascota;
  razasDogs: string[] = [];
  dueno: Dueno = new Dueno();  // Crea una instancia de Dueno para el formulario

  constructor(public dogApiService: ApidogsService, private homepage:HomePage,private method:MethodService,private fireBase:FirebaseService) {
    this.dogApiService.razaDog().subscribe((response: any) => {
      if (response && response.message) {
        // Las razas de perro están en response.message
        this.razasDogs = Object.keys(response.message);
      }
    });
    this.mascota = JSON.parse(localStorage.getItem('clase')||'[]');
  }
  
  ngOnInit() {}

  async editarPet() {
    if (this.validarMascota(this.mascota)) {

      this.fireBase.updatePet(this.mascota);
      console.log('Nueva mascota:', this.mascota);
      await this.fireBase.obtPets(this.mascota.idDueno);
      this.method.presentToast('top','Se ha editado su mascota '+ this.mascota.nombre +' con exito')
      localStorage.removeItem('clase');
    } else {
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
    this.homepage.changeHeader(true,'Editar Mascota');
  }
}




