import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { User } from 'src/app/class/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserdefaultService {

  //URL:string='https://jsonplaceholder.typicode.com';
  //url:string='http://192.168.1.13:3000';
  apiUrl = 'https://raw.githubusercontent.com/Leckiam/FL-MC/Maikel-C/PetsFound/usuarios_PGY4121_04.json';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    }),
  };
  usersApi:[User]= [new User()];
  constructor(private http:HttpClient) { }

  getData(): Observable<any> {
    const apiUrl = 'https://raw.githubusercontent.com/Leckiam/FL-MC/Maikel-C/PetsFound/usuarios_PGY4121_04.json';
    return this.http.get(apiUrl);
  }

  apiUsers(usersApi:any){
    this.getData().subscribe(async (data) => {
      const dataUsers = await data.users;
      usersApi = dataUsers;
    })
  }
}
