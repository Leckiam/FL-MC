import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import {Location} from '@angular/common';
import { User } from 'src/app/class/user/user';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  data:any;
  constructor(private router: Router, private navCtrl:NavController, private toastController: ToastController) { }

  retroceder() {
    this.navCtrl.back();
  }

  getUsername(correo:string){
    let username = '';
    for (let i = 0; i < correo.length; i++) {
      const letra = correo[i];
      if (letra == '@') {
        break;
      } else {
        username+=letra;
      }
    }
    return username;
  }
  
  bienvenida(data:any){
    let msg1 = 'Bienvenido, '+ data;
    this.presentToast('top', msg1);
    let msg2 = 'Has iniciado sesión con éxito!';
    this.presentToast('bottom', msg2);
  }
  
  async presentToast(position: 'top' | 'middle' | 'bottom',msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position,
    });

    await toast.present();
  }

  transfer(){
    const getUser = localStorage.getItem('user');
    this.bienvenida(getUser);
    /*
    if (!getUser) {
      this.activatedRoute.queryParams.subscribe(params =>{
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
        } else {
          this.ingresar('login','')
        }
      })
    }
    */
    return getUser;
  }

  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('dueno');
    localStorage.removeItem('mascotas');
    this.ingresar('login','')
  }

  validarTabsBar(nombrePage:any){
    let listaWhite=['home','account'];
    if (listaWhite.includes(nombrePage)) {
      return true
    } else {
      return false
    }
  }
  
  ingresar(nombrePage:string,nameComponent?:string,navigationExt?:any){
    if (navigationExt) {
      this.router.navigate(['/'+nombrePage],navigationExt);
    } else {
      if (nameComponent) {
        nombrePage = nombrePage + '/' + nameComponent;
      }
      this.router.navigate(['/'+nombrePage]);
    }
    
  }

}
