import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleEmployeeService {

  vehicleEmployee: any[] = [];

  constructor(public http: HttpClient) { }

  getVehicleEmployee() {
    return this.http.get(`${environment.apiURL}/api/vehicle-employee`)
      .pipe(
        tap(
          (vehicleEmployees: any[]) => this.vehicleEmployee = vehicleEmployees
        )
      );
  }

  postVehicleEmployee(vehicleEmployee: any) {
    console.log('aqui')
    return this.http.post(`${environment.apiURL}/api/vehicle-employee`, vehicleEmployee)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
