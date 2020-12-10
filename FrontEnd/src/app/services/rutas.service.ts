import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../../../../../Visual Studio Code/Recoleccion/FrontEnd/src/environments/environment';
import {Route} from "../../../../../../Visual Studio Code/Recoleccion/FrontEnd/src/app/models/route";

@Injectable({
  providedIn: 'root'
})

export class RutasService {


  routes: Route[] = [];
  selectedRoute: Route;

  constructor(public http: HttpClient) {
    console.log('Servicio Rutas listo');

    this.selectedRoute = new Route();
  }

  getRoutes() {
    return this.http.get(`${environment.apiURL}/api/routes`)
      .pipe(
        tap(
          (routes: Route[]) => this.routes = routes
        )
      );
  }

  postRoutes(route: Route) {
    return this.http.post(`${environment.apiURL}/api/routes`, route)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  putRoutes(route: Route) {
    return this.http.put(`${environment.apiURL}/api/routes/${route._id}`, route)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  deleteRoute(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/routes/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
