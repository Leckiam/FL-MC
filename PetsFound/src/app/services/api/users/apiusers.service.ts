import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/class/user/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiusersService {

  //URL:string='https://jsonplaceholder.typicode.com';
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
    this.getData().subscribe((data) => {
      const dataUsers = data.users;
      this.usersApi = dataUsers;
    })
  }
}
