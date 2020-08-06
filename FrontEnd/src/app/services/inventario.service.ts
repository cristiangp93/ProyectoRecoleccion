import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Material} from "../models/material";
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Vehicle} from "../models/vehicle";

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  materials: Material[] = [];
  vehicles: Vehicle[] = [];
  selectedMaterial: Material;
  selectedVehicle: Vehicle;

  constructor(public http: HttpClient) {
    console.log('Servicio Inventario listo');
    this.selectedMaterial = new Material();
    this.selectedVehicle = new Vehicle();
  }

  /* Materiales */
  getMaterials() {
    return this.http.get(`${environment.apiURL}/api/materials`)
      .pipe(
        tap(
          (materials: Material[]) => this.materials = materials
        )
      );
  }

  postMaterial(material: Material) {
    return this.http.post(`${environment.apiURL}/api/materials`, material)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  putMaterial(material: Material) {
    return this.http.put(`${environment.apiURL}/api/materials/${material._id}`, material)
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

  deleteMaterial(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/materials/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
