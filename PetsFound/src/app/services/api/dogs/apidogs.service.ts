import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApidogsService {

  apiUrl = 'https://dog.ceo/api/breeds/list/all';
  constructor(private http: HttpClient) { }

  razaDog(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
