import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteSectorVehicleEmployeeService {

  routesSectorVehicleEmployee: any[] = [];

  constructor(public http: HttpClient) { }

  getRouteSectorVehicleEmployee() {
    return this.http.get(`${environment.apiURL}/api/routes-sector-vehicles-employee`)
      .pipe(
        tap(
          (routes: any[]) => this.routesSectorVehicleEmployee = routes
        )
      );
  }

  postRouteSectorVehicleEmployee(routeSector: any) {
    return this.http.post(`${environment.apiURL}/api/routes-sector-vehicles-employee`, routeSector)
      .pipe(
        catchError(err => {
          return of(err.error);
        })
      );
  }
}
