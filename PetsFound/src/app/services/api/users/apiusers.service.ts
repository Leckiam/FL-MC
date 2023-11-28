import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/class/user/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiusersService {

  apiUrl = 'https://raw.githubusercontent.com/Leckiam/FL-MC/main/PetsFound/usuarios_PGY4121_04.json';

  usersApi:User[]= [new User()];
  constructor(private http:HttpClient) {
    this.setApiToUsers();
  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setApiToUsers(){
    this.getData().subscribe(async (data) => {
      const dataUsers = data.users;
      this.usersApi = await dataUsers;
    })
  }
  
  buscarUser(id_user:string){
    let userTmp:User = new User();
    for (let i = 0; i < this.usersApi.length; i++) {
      const user = this.usersApi[i];
      if (user.id == id_user) {
        userTmp=user;
        break;
      }
    }
    return userTmp;
  }
}
