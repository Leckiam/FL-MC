import { Injectable } from '@angular/core';
import { FirebaseAuthentication as fireBaseAuth } from '@capacitor-firebase/authentication';
import { FirebaseFirestore as fireBaseStore } from '@capacitor-firebase/firestore';
import { ApiusersService } from '../api/users/apiusers.service';
@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(private apiUsers:ApiusersService) {
  }

  async addUser(email:string,password:string,username:string,nombre:string,celular?:number,edad?:number){
    let idUser:string = '';
    await fireBaseAuth.createUserWithEmailAndPassword({
      email: email,
      password: password
    }).then((userCredential) => {
      // Signed in 
      fireBaseAuth.updateProfile({
        displayName: username
      })
      const user = userCredential.user;
      console.log('se creo xd')
      if (user) {
        idUser = user?.uid;
        console.log(user)
      }
      this.addDueno(email,nombre,'','',912345678,18,idUser);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  async addDueno(email:string,nombre:string,ap_paterno:string,ap_materno:string,celular:number,edad:number,idUser:string){
    fireBaseStore.addDocument({
      reference: 'Dueno',
      data: {
        email:email,
        nombre:nombre,
        ap_paterno:ap_paterno,
        ap_materno:ap_materno,
        edad:edad,
        celular:celular,
        idUser:idUser,
      }
    });
    console.log('Hola dueno')
  }
  async loginUser(email:string,password:string){
    await fireBaseAuth.signInWithEmailAndPassword({
      email: email,
      password: password
    }).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('se logeo xd')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  async obtUsers(){
    await fireBaseStore.getCollection({
      reference: 'Dueno',
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          {
            type: 'where',
            fieldPath: 'born',
            opStr: '==',
            value: 1912,
          },
        ],
      },
      queryConstraints: [
        {
          type: 'orderBy',
          fieldPath: 'born',
          directionStr: 'desc',
        },
        {
          type: 'limit',
          limit: 10,
        },
      ],
    }).then((data) => {
      console.log(data.snapshots.length)
    });
  }

  async existeUsersInBD(){
    await this.validarStaff();
    console.log('validacion hecha (fuera de validarStaff())');
    if (this.apiUsers.usersApi.length<19) {
      window.location.reload();
    } else {
      for (let i = 0; i < this.apiUsers.usersApi.length; i++) {
        const userApi = this.apiUsers.usersApi[i];
        this.addUser(userApi.correo,userApi.password,userApi.username,userApi.nombre);
      }
    }
  }
  async validarStaff(){
    this.apiUsers.setApiToUsers();
    console.log('validacion hecha (dentro de validarStaff())');
  }
}
