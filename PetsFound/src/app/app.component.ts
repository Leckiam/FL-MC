import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  data:any
  firstTime!:boolean
  isLogin!:boolean
  constructor(private activateRoute: ActivatedRoute,private router: Router, private navCtrl:NavController, private toastController: ToastController) { 
    this.data = '';
    this.firstTime = true;
    this.isLogin = false
  }

  estadoData(){
    if (this.data=='') {
      return true;
    } else {
      return false;
    }
  }

  retroceder() {
    this.navCtrl.pop();
  }

  transfer(){
    if (this.estadoData()) {
      this.activateRoute.queryParams.subscribe(params =>{
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
          this.bienvenida(this.data.usuario)
        } else {
          this.ingresar('login');
        }
      });
    }
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
    this.data='';
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
    this.firstTime = false
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
