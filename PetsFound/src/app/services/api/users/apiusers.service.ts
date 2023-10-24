import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/class/user/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiusersService {

  //URL:string='https://jsonplaceholder.typicode.com';
  //url:string='http://192.168.1.13:3000';
  apiUrl = 'https://raw.githubusercontent.com/Leckiam/FL-MC/Maikel-C/PetsFound/usuarios_PGY4121_04.json';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    }),
  };
  usersApi:User[]= [new User()];
  constructor(private http:HttpClient) {
    this.setApiToUsers()
  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setApiToUsers(){
    this.getData().subscribe(async (data) => {
      const dataUsers = await data.users;
      this.usersApi = dataUsers;
    })
  }
}
