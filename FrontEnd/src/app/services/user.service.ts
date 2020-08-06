import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  selectedUser: User;

  constructor(public http: HttpClient) {
    console.log('Servicio Usuarios listo');
    this.selectedUser = new User();
  }

  getUsers() {
    return this.http.get(`${environment.apiURL}/api/users`)
      .pipe(
        tap(
          (usuarios: User[]) => this.users = usuarios
        )
      );
  }

  postUser(user: User) {
    return this.http.post(`${environment.apiURL}/api/users`, user)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  putUser(user: User) {
    return this.http.put(`${environment.apiURL}/api/users/${user._id}`, user)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  deleteUser(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/users/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
