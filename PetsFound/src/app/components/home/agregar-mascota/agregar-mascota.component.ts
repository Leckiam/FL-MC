import { Component } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { Mascota } from 'src/app/class/mascota/mascota';
import { HomePage } from 'src/app/pages/home/home.page';
import { ApidogsService } from 'src/app/services/api/dogs/apidogs.service';
import { ApipetsService } from 'src/app/services/api/pets/apipets.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.scss'],
})
export class AgregarMascotaComponent {

  mascota: Mascota = new Mascota();  // Crea una instancia de Mascota para el formulario
  razasDogs:string[]= [];
  dueno: Dueno = new Dueno();  // Crea una instancia de Dueno para el formulario

  constructor(public dogApiService: ApidogsService, private petsService: ApipetsService, private appComponentt: AppComponent, private homepage:HomePage) {
    this.dogApiService.razaDog().subscribe((response: any) => {
      if (response && response.message) {
        // Las razas de perro están en response.message
        this.razasDogs = Object.keys(response.message);
      }
    });
    this.dueno.id = this.homepage.user.id;
    this.mascota.tipo = '';
    this.mascota.dueno = this.dueno;
    this.mascota.edad = 0;
    this.mascota.descripcion = '';
  }

  agregarMascota() {
    if (this.validarMascota(this.mascota)) {
      this.petsService.agregarMascota(this.mascota);
      console.log('Nueva mascota:', this.mascota);
  
      // Limpia el formulario
      this.mascota = new Mascota();
      this.mascota.dueno = this.dueno;
    } else {
      console.log('Los datos de la mascota no son válidos. Verifica los campos.');
      // Mostrar un mensaje de error
    }
  }

  validarMascota(mascota: Mascota): boolean {
    if (mascota.nombre && mascota.nombre.length >= 4 && mascota.edad && mascota.edad > 0 && mascota.descripcion) {
      return true;
    } else {
      let msg = '';
      if (!mascota.nombre || mascota.nombre.length < 4) {
        msg += 'El nombre debe tener al menos 4 caracteres. ';
      }
      if (!mascota.edad || mascota.edad <= 0) {
        msg += 'La edad debe ser un número mayor que 0.';
      }
      this.appComponentt.presentToast('bottom', msg);
      return false;
    }
}
}
