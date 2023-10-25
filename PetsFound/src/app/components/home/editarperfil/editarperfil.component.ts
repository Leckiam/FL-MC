import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { HomePage } from 'src/app/pages/home/home.page';
import { ApiduenosService } from 'src/app/services/api/duenos/apiduenos.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss'],
})
export class EditarperfilComponent implements OnInit {

  dueno:Dueno = new Dueno();
  constructor(private homepage:HomePage,private apiDueno:ApiduenosService, private method:MethodService) {
    this.apiDueno.setApiToUsers(this.homepage.user)
    this.dueno = this.apiDueno.buscarDueno(this.homepage.user);
    console.log('hola gente: '+this.dueno.correo)
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.homepage.changeHeader(true,'Editar perfil');
  }

  updateDueno(){
    console.log('entro xd')
    if (this.validarDataDueno(this.dueno)) {
      this.method.presentToast('top','Sus datos han sido actualizados')
      this.apiDueno.editarDueno(this.homepage.user,this.dueno)
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
