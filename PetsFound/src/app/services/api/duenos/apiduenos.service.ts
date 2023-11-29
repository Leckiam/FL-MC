import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dueno } from 'src/app/class/dueno/dueno';
import { User } from 'src/app/class/user/user';
import { ApiusersService } from '../users/apiusers.service';

@Injectable({
  providedIn: 'root'
})
export class ApiduenosService {

  //URL:string='https://jsonplaceholder.typicode.com';
  apiUrl = 'https://raw.githubusercontent.com/Leckiam/FL-MC/Maikel-C/PetsFound/usuarios_PGY4121_04.json';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    }),
  };

  duenosApi:Dueno[]= [];
  duenos:Dueno[]= [];

  constructor(private http:HttpClient, private apiUser:ApiusersService) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setApiToUsers(){
    this.getData().subscribe(async (data) => {
      const dataUsers = data.duenos;
      this.duenosApi = await dataUsers;
    })
  }

}
