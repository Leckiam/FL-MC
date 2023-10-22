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
  url:string='http://192.168.1.13:3000';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    }),
  };
  constructor(private http:HttpClient) { }

  getUserForParam(param: any,type:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users?${type}=` + param).pipe(
    tap((_) => console.log(`User fetched: ${param}`)),
    catchError(this.handleError<User[]>(`Get user ${type}=${param}`))
    );
  }
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users/`).pipe(
    tap((user) => console.log('User fetched!')),
    catchError(this.handleError<User[]>('Get User', []))
    );
  }
  addUser(user: User): Observable<any> {
    return this.http
    .post<User>(`${this.url}/users`, user, this.httpHeader)
    .pipe(catchError(this.handleError<User>('Add User')));
  }
  updateUser(id: any, user: User): Observable<any> {
    return this.http.put(`${this.url}/users/` + id, user,
    this.httpHeader).pipe(
    tap((_) => console.log(`User updated: ${id}`)),
    catchError(this.handleError<User[]>('Update user'))
    );
  }
  deleteUser(id: any): Observable<User[]> {
    return this.http.delete<User[]>(`${this.url}/users/` + id,
    this.httpHeader).pipe(
    tap((_) => console.log(`User deleted: ${id}`)),
    catchError(this.handleError<User[]>('Delete user'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
    };
  }
}
