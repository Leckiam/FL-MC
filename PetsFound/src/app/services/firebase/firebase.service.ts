import { Injectable } from '@angular/core';
import { User as UserFB, FirebaseAuthentication as fireBaseAuth } from '@capacitor-firebase/authentication';
import { ApiusersService } from '../api/users/apiusers.service';
import { MethodService } from '../method/method.service';
import { FbduenoService } from './dueno/fbdueno.service';
import { FbuserService } from './user/fbuser.service';
import { FbmascotaService } from './mascota/fbmascota.service';
import { Dueno } from 'src/app/class/dueno/dueno';
import { Mascota } from 'src/app/class/mascota/mascota';
@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private apiUsers:ApiusersService, private method:MethodService,
    private fBUser:FbuserService, private fBDueno:FbduenoService, private fbMascota:FbmascotaService) {}

  async addUser(email:string,password:string,nombre:string){
    await fireBaseAuth.createUserWithEmailAndPassword({
      email: email,
      password: password
    }).then((userCredential) => {
      let user_id;
      if (userCredential.user) {
        const user:UserFB = userCredential.user;
        user_id =  user.uid;
      }
      if (user_id) {
        console.log(JSON.stringify(user_id))
        console.log(user_id)
        this.fBDueno.addDueno(user_id,email,nombre);
      }
    })
    .catch((error) => {
      this.method.presentToast('top','La direccion de email/correo ya esta en uso por otro usuario');
    });
  }

  addDueno(user_id:string,email:string,nombre:string,ap_paterno?:string,ap_materno?:string,celular?:number,edad?:number){
    this.fBDueno.addDueno(user_id,email,nombre,ap_paterno,ap_materno,celular,edad);
  }
  async obtDueno(correo:string){
    await this.fBDueno.obtDueno(correo);
  }
  async updateDueno(dueno:Dueno){
    await this.fBDueno.updateDueno(dueno);
  }
  async deleteDueno(id_dueno:string){
    await this.fBDueno.deleteDueno(id_dueno);
  }

  async updatePass(newPass:string){
    this.fBUser.updatePass(newPass);
  }
  async loginUser(email:string,password:string){
    await this.fBUser.loginUser(email,password);
  }
  logOut(){
    this.fBUser.logOut();
  }

  async recoverPass(correo:string){
    await this.fBUser.recoverPass(correo);
  };

  addMascota(id_dueno:string,nombre:string,tipo:string,edad:number,descripcion?:string,raza?:string){
    this.fbMascota.addMascota(id_dueno,nombre,tipo,edad,descripcion,raza);
  }
  async obtPets(id_dueno:string){
    await this.fbMascota.obtPets(id_dueno);
  }
  async updatePet(mascota:Mascota){
    await this.fbMascota.updatePet(mascota);
  }
  async deletePet(id_pet:string){
    await this.fbMascota.deletePet(id_pet);
  }


  async existeUsersInBD(){
    await this.validarStaff();
    console.log('validacion hecha (fuera de validarStaff())');
    if (this.apiUsers.usersApi.length!=19) {
      window.location.reload();
    } else {
      console.log('entro else')
      for (let i = 0; i < 19; i++) {
        const userApi = this.apiUsers.usersApi[i];
        await this.addUser(userApi.correo,userApi.password,userApi.nombre);
      }
    }
  }
  async validarStaff(){
    this.apiUsers.setApiToUsers();
    console.log('validacion hecha (dentro de validarStaff())');
  }
}
