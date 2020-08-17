import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RrhhService} from "../../../services/rrhh.service";
import {Employee} from "../../../models/employee";
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-rrhh',
  templateUrl: './rrhh.component.html',
  styles: []
})
export class RrhhComponent implements OnInit {

  loading: boolean;
  cargos: any[] = [];

  constructor(private modalService: NgbModal,
              private _rS: RrhhService,
              public http: HttpClient) {
    this.getRrhh().then(() => {
      this.loading = false;
    });
  }

  async getRrhh() {
    this.loading = true;
    await this._rS.getRrhh().subscribe(resp => {
      this._rS.employees = resp as Employee[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  openWindowCustomClass(content3) {
    this.modalService.open(content3);
  }

  ngOnInit(): void {
    this.http.get('../../../assets/docs/cargos.json')
      .subscribe( (cargos: any[]) => {
        this.cargos = cargos
      })
  }

  addEmployee(employeeForm: NgForm) {
    if (employeeForm.invalid) {
      Object.values(employeeForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (employeeForm.value._id) {
      this._rS.putEmployee(employeeForm.value).subscribe(data => {
        this.getRrhh().then(() => {
          Swal.fire(
            'Ok!',
            'Empleado actualizado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    } else {
      this._rS.postEmployee(employeeForm.value).subscribe(data => {
        this.getRrhh().then(() => {
          Swal.fire(
            'Ok!',
            'Empleado registrado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    }

    this._rS.selectedEmployee = new Employee();
    this.modalService.dismissAll();
  }

  editEmployee(employee: Employee) {
    this._rS.selectedEmployee = employee;
  }

  deleteEmployee(_id: string) {
    this._rS.deleteEmployee(_id)
      .subscribe(res => {
        this.getRrhh().then(() => {
          Swal.fire(
            'Ok!',
            'Empleado eliminado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
  }

}
