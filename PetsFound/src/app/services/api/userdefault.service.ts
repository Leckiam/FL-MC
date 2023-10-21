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
      "username": "fr.cardemil@duocuc.cl",
      "password": "123456"     
    },
    {
      "id": 2,
      "nombre": "MARCELO CASTILLO",
      "username": "mar.castillop@duocuc.cl",
      "password": "123456"     
    },
    {
      "id": 3,
      "nombre": "MAIKEL CISTERNAS",
      "username": "mai.cisternas@duocuc.cl",
      "password": "123456"
    },
    {
      "id": 4,
      "nombre": "FRANCISCO LAZCANO",
      "username": "fr.lazcanor@duocuc.cl",
      "password": "123456"
    },
    {
      "id": 5,
      "nombre": "MARCELO PENA",
      "username": "marc.penas@duocuc.cl",
      "password": "123456"
    },
    {
      "id": 6,
      "nombre": "JOAQUIN ROCHA",
      "username": "jo.rocha@duocuc.cl",
      "password": "123456"
    },
    {
      "id": 7,
      "nombre": "DIEGO SALDIVAR",
      "username": "die.saldivar@duocuc.cl",
      "password": "123456"
    },
  ];
  constructor() { }

  getUser(usuario:string){
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.username==usuario) {
        return user;
      }
    } 
    return null;
  }
  addUsersApiBD(){
    let listaApiUsers=[];
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      const dataApi = [user.nombre,user.username, user.password];
      listaApiUsers.push(dataApi);
    }
    return listaApiUsers;
    
  }
}
