import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoggingIn = false;

  constructor(private navCtrl: NavController, private router: Router, private animationCtrl: AnimationController) { }
  
  ngOnInit() {
  }

    // Función para iniciar sesión
    async goToHome() {
      this.isLoggingIn = true; // Mostrar el mensaje "Ingresando..."
      
      // Simular una demora de 2 segundos 
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      // Navegar al home después de completar la acción de inicio de sesión
      this.router.navigate(['/home']);
    }
}




