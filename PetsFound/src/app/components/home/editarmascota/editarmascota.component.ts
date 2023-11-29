import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { ActivatedRoute } from '@angular/router';
import { ApipetsService } from 'src/app/services/api/pets/apipets.service';
import { Mascota } from 'src/app/class/mascota/mascota';
import { ApidogsService } from 'src/app/services/api/dogs/apidogs.service';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';
import { ApiduenosService } from 'src/app/services/api/duenos/apiduenos.service';


@Component({
  selector: 'app-editarmascota',
  templateUrl: './editarmascota.component.html',
  styleUrls: ['./editarmascota.component.scss'],
})
export class EditarmascotaComponent  implements OnInit {
  Id: String; 
  mascota: Mascota = new Mascota();
  razasDogs: string[] = [];
  dueno: Dueno = new Dueno();  // Crea una instancia de Dueno para el formulario

  constructor(public dogApiService: ApidogsService, private petsService: ApipetsService, private homepage:HomePage,private method:MethodService,private apiDueno:ApiduenosService) {
    this.dogApiService.razaDog().subscribe((response: any) => {
      if (response && response.message) {
        // Las razas de perro están en response.message
        this.razasDogs = Object.keys(response.message);
      }
    });
    this.mascota.nombre = '';
    this.mascota.raza = '';
    this.mascota.tipo = '';
    this.mascota.dueno = this.dueno;
    this.mascota.edad = 0;
    this.mascota.descripcion = '';
  }
  ngOnInit() {  }
  editarmascota() {
    if (this.validarMascota(this.mascota)) {
      //  datos de la mascota son válidos, aqui creo que se agrega a la base de datos que vamos elegir eso creo (segun vi al video repaso xd)
      this.petsService.agregarMascota(this.mascota);
      console.log('Nueva mascota:', this.mascota);
      this.method.presentToast('top','Se ha editado su mascota '+ this.mascota.nombre +' con exito')
      // Limpia el formulario
      this.mascota = new Mascota();
      this.mascota.dueno = this.dueno;

     
    } else {
      console.log('Los datos de la mascota no son válidos. Verifica los campos.');
      //  mostrar un mensaje de error 
    }
  }

  validarMascota(mascota: Mascota): boolean {
    if (
      mascota.nombre && mascota.nombre.length >= 4 &&
      mascota.dueno &&
      mascota.edad && mascota.edad > 0 &&
      mascota.descripcion
    ) {
      return true;
    } else {
      return false;
    }
  }
  editarMascota() {
    this.homepage.changeHeader(true,'Agregar Mascota');
  }
}




