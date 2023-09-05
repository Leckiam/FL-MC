import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoggingIn = false;
  
  user={
    usuario:"",
    password:""
  }
  constructor(private navCtrl: NavController, private router: Router, private animationCtrl: AnimationController,) { }
  
  ngOnInit() {
  }

    ingresar(){
      console.log(this.user)
      let navigationextras: NavigationExtras={
        state:{
          user: this.user 
        }
      }
      this.router.navigate(['/home'],navigationextras);
    }

    
}




