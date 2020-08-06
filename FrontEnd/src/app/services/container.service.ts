import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Container} from "../models/container";

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  containers: Container[] = [];
  selected_container: Container;

  constructor(public http: HttpClient) {
    console.log('servicios contenedor listo');
    this.selected_container = new Container();
  }

  getContainers() {
    return this.http.get(`${environment.apiURL}/api/containers`)
      .pipe(
        tap(
          (containers: Container[]) => this.containers = containers
        )
      );
  }

  postContainer(container: Container) {
    return this.http.post(`${environment.apiURL}/api/containers`, container)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  putContainer(container: Container) {
    return this.http.put(`${environment.apiURL}/api/containers/${container._id}`, container)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  deleteContainer(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/containers/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
