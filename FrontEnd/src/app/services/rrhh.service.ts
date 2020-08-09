import { Injectable } from '@angular/core';
import {Employee} from "../models/employee";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RrhhService {

  employees: Employee[] = [];
  selectedEmployee: Employee;

  constructor(public http: HttpClient) {
    console.log('Servicio rrhh listo')
    this.selectedEmployee = new Employee();
  }

  getRrhh() {
    return this.http.get(`${environment.apiURL}/api/employees`)
      .pipe(
        tap(
          (employees: Employee[]) => this.employees = employees
        )
      );
  }

  postEmployee(employee: Employee) {
    return this.http.post(`${environment.apiURL}/api/employees`, employee)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  putEmployee(employee: Employee) {
    return this.http.put(`${environment.apiURL}/api/employees/${employee._id}`, employee)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }

  deleteEmployee(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/employees/${_id}`)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );
  }
}
