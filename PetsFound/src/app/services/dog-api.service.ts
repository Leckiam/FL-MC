import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {
  
   apiUrl = 'https://dog.ceo/api/breeds/list/all';

  constructor(private http: HttpClient) { }

  razaDog(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
