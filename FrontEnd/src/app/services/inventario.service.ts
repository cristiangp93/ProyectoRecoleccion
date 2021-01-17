import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Vehicle} from "../models/vehicle";

@Injectable({
  providedIn: 'root'
})
export class InventarioService {


  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle;

  constructor(public http: HttpClient) {
    console.log('Servicio Inventario listo');
    this.selectedVehicle = new Vehicle();
  }




  /* Vehículos */

  getVehicles() {
    return this.http.get(`${environment.apiURL}/api/vehicles`)
      .pipe(
        tap(
          (vehicles: Vehicle[]) => this.vehicles = vehicles
        )
      );
  }

  postVehicle(vehicle: Vehicle) {
    return this.http.post(`${environment.apiURL}/api/vehicles`, vehicle)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }


  putVehicle(vehicle: Vehicle) {
    return this.http.put(`${environment.apiURL}/api/vehicles/${vehicle._id}`, vehicle)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  deleteVehicle(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/vehicles/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
