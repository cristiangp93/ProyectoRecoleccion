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
    return this.http.post(`${environment.apiURL}/api/vehicle-employee`, vehicleEmployee)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  putVehicleEmployee(vehicleEmployee: any) {
    return this.http.put(`${environment.apiURL}/api/vehicle-employee/${vehicleEmployee._id}`, vehicleEmployee)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  deleteVehicleEmployee(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/vehicle-employee/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
