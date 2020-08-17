import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Sector} from "../models/sector";
import {Schedule} from "../models/schedule";

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  sectors: Sector[] = [];
  schedule: Schedule[] = [];
  selectedSector: Sector;
  selectedSchedule: Schedule;

  constructor(public http: HttpClient) {
    console.log('Servicio Rutas listo');
    this.selectedSector = new Sector();
    this.selectedSchedule = new Schedule();
  }

  getSectors() {
    return this.http.get(`${environment.apiURL}/api/sectors`)
      .pipe(
        tap(
          (sectors: Sector[]) => this.sectors = sectors
        )
      );
  }

  getSchedules() {
    return this.http.get(`${environment.apiURL}/api/schedules`)
      .pipe(
        tap(
          (schedules: Schedule[]) => this.schedule = schedules
        )
      );
  }

  postSector(sector: Sector) {
    return this.http.post(`${environment.apiURL}/api/sectors`, sector)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  postSchedule(schedule: Schedule) {
    return this.http.post(`${environment.apiURL}/api/schedules`, schedule)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  putSector(sector: Sector) {
    return this.http.put(`${environment.apiURL}/api/sectors/${sector._id}`, sector)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  putSchedule(schedule: Schedule) {
    return this.http.put(`${environment.apiURL}/api/schedules/${schedule._id}`, schedule)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  deleteSector(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/sectors/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  deleteSchedule(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/schedules/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
