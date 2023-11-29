import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { HomePage } from 'src/app/pages/home/home.page';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss'],
})
export class EditarperfilComponent implements OnInit {

  dueno:Dueno = new Dueno();
  constructor(public homepage:HomePage, private method:MethodService, private fireBase:FirebaseService) {
    this.dueno = this.homepage.dueno;
    console.log('hola gente: '+this.dueno.correo)
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.homepage.changeHeader(true,'Editar perfil');
  }

  async updateDueno(){
    console.log('entro xd')
    if (this.validarDataDueno(this.dueno)) {
      this.method.presentToast('top','Sus datos han sido actualizados');
      await this.fireBase.updateDueno(this.dueno);
      this.homepage.dueno = JSON.parse(localStorage.getItem('dueno')||'undefined');
    } else {
      this.method.presentToast('top','Sus datos no han sido actualizados')
    }
  }

  validarDataDueno(dueno:Dueno){
    if (
      dueno.nombre && dueno.nombre.length >= 4 &&
      dueno.ap_paterno && dueno.ap_paterno.length >= 5 && 
      dueno.edad && dueno.edad >= 10 &&
      dueno.celular && dueno.celular.toString().length == 9
    ) {
      return true;
    } else {
      return false;
    }
  }
}
