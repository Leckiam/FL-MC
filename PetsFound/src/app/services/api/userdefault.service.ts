import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdefaultService {

  users:any=
  [
    {
      "id": 1,
      "nombre": "FRANCISCA CARDEMIL",
      "correo": "fr.cardemil@duocuc.cl",
      "username": "fr.cardemil",
      "password": "123456"     
    },
    {
      "id": 2,
      "nombre": "MARCELO CASTILLO",
      "correo": "mar.castillop@duocuc.cl",
      "username": "mar.castillop",
      "password": "123456"     
    },
    {
      "id": 3,
      "nombre": "MAIKEL CISTERNAS",
      "correo": "mai.cisternas@duocuc.cl",
      "username": "mai.cisternas",
      "password": "123456"
    },
    {
      "id": 4,
      "nombre": "FRANCISCO LAZCANO",
      "correo": "fr.lazcanor@duocuc.cl",
      "username": "fr.lazcanor",
      "password": "123456"
    },
    {
      "id": 5,
      "nombre": "MARCELO PENA",
      "correo": "marc.penas@duocuc.cl",
      "username": "marc.penas",
      "password": "123456"
    },
    {
      "id": 6,
      "nombre": "JOAQUIN ROCHA",
      "correo": "jo.rocha@duocuc.cl",
      "username": "jo.rocha",
      "password": "123456"
    },
    {
      "id": 7,
      "nombre": "DIEGO SALDIVAR",
      "correo": "die.saldivar@duocuc.cl",
      "username": "die.saldivar",
      "password": "123456"
    },
  ];
  constructor() { }

  getUser(userLogin:any){
    console.log('entro')
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.username==userLogin.usuario && user.password==userLogin.password) {
        return user;
      }
    } 
    return null;
  }
  addUsersApiBD(){
    let listaApiUsers=[];
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      const dataApi = [user.nombre,,user.correo,user.username, user.password];
      listaApiUsers.push(dataApi);
    }
    return listaApiUsers;
    
  }
}
