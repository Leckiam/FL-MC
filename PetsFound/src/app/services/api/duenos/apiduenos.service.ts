import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dueno } from 'src/app/class/dueno/dueno';

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
  duenosApi:Dueno[]= [new Dueno()];
  constructor(private http:HttpClient) {
    this.setApiToUsers()
  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setApiToUsers(){
    this.getData().subscribe((data) => {
      const dataUsers = data.duenos;
      this.duenosApi = dataUsers;
    })
  }
}
