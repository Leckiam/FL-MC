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
  firstTime:any

  constructor(private activateRoute: ActivatedRoute,private router: Router, private navCtrl:NavController, private toastController: ToastController) { 
    this.data = '';
    this.firstTime = true;
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
    this.firstTime = false
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
    this.ingresar('login')
  }

  ingresar(nombrePage:any,navigationExt?:any){
    if (navigationExt) {
      this.router.navigate(['/'+nombrePage],navigationExt);
    } else {
      this.router.navigate(['/'+nombrePage]);
    }
  }
}
