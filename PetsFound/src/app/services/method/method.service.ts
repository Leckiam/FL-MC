import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  constructor(private router: Router, private navCtrl:NavController, private toastController: ToastController, private activatedRoute: ActivatedRoute) { }

  retroceder() {
    this.navCtrl.back();
  }
  getLength(texto:string):number{
    let textoLength = 0;
    console.log(texto + ' inicio');
    if (texto==undefined) {
      textoLength==0;
    } else {
      textoLength==texto.length;
    }
    console.log(texto + textoLength);
    return textoLength;
  }
  getUsername(correo:string){
    let username = '';
    if (correo!=undefined) {
      correo=correo.trim();
      for (let i = 0; i < this.getLength(correo); i++) {
        const letra = correo[i];
        if (letra == '@') {
          break;
        } else {
          username+=letra;
        }
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
  
  ingresar(nombrePage:string,nameComponent?:string,navigationExt?:NavigationExtras){
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
