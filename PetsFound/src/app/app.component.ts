import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  cantLoadPages!:number;
  constructor(private toastController: ToastController) { 
    this.cantLoadPages = 0;
  }

  ngOnInit() {}

  async presentToast(position: 'top' | 'middle' | 'bottom',msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
}
