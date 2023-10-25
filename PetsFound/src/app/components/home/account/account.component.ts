import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { User } from 'src/app/class/user/user';
import { HomePage } from 'src/app/pages/home/home.page';
import { ApiduenosService } from 'src/app/services/api/duenos/apiduenos.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  data:User = new User();
  nameComponent:any;
  duenos:Dueno[];
  constructor(private method:MethodService, private apiDuenos:ApiduenosService, private homepage:HomePage) {
    this.data = this.homepage.user;
  }

  ngOnInit() {
    let btnEdit = document.querySelector('#btnEditPerf')
    let accountObj = this;
    btnEdit?.addEventListener('click',function(){
      accountObj.registrarDuenosApi();
    });

  }

  logOut(){
    this.method.logOut();
  }
  IrEditarPerfil() {
    this.method.ingresar('home','editarperfil');
  }
  generateQR() {
    this.method.ingresar('home','generate-qr');
  }

  ionViewWillEnter() {
    console.log('Esto es ionViewWillEnter [/Home]');
    this.homepage.changeHeader(false,'Cuenta');
    this.homepage.bbdd.crearBD();
    this.homepage.seg  = 0;
    this.homepage.cargarTablaDelay(2);
    console.log(this.data);
  }
  registrarDuenosApi(){
    this.duenos = this.apiDuenos.duenosApi;
    let data = [];
    let column =[]
    if (this.homepage.duenosDB.length < 19) {
      for (let i = 0; i < this.duenos.length; i++) {
        const duenoTmp = this.duenos[i];
        if (duenoTmp.ap_materno!='') {
          data = [duenoTmp.id,duenoTmp.nombre,duenoTmp.correo,duenoTmp.ap_paterno,duenoTmp.ap_materno,duenoTmp.edad,duenoTmp.celular,duenoTmp.id]
          column = ['id','nombre','correo','ap_paterno','ap_materno','edad','celular','id_user']
        }else{
          data = [duenoTmp.id,duenoTmp.nombre,duenoTmp.correo,duenoTmp.ap_paterno,duenoTmp.edad,duenoTmp.celular,duenoTmp.id]
          column = ['id','nombre','correo','ap_paterno','edad','celular','id_user']
        }
        this.homepage.bbdd.addValuesInTable(data,column,'dueno')
      }
    }
  }
}
