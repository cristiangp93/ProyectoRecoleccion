import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InventarioService} from "../../../services/inventario.service";
import {Vehicle} from "../../../models/vehicle";
import {RrhhService} from "../../../services/rrhh.service";
import {Employee} from "../../../models/employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {VehicleEmployeeService} from "../../../services/vehicle-employee.service";

@Component({
  selector: 'app-vehicle-employee',
  templateUrl: './vehicle-employee.component.html',
  styles: []
})
export class VehicleEmployeeComponent implements OnInit {

  assignForm: FormGroup;

  constructor(private modalService: NgbModal,
              public _iS: InventarioService,
              public _rS: RrhhService,
              public _vES: VehicleEmployeeService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getVehicles();
    this.getRrhh();
    this.getVehicleEmployee();

    this.assignForm = this.fb.group({
      vehicle: ['', Validators.required],
      employee: ['', Validators.required]
    })
  }

  async getVehicles() {
    await this._iS.getVehicles().subscribe(resp => {
      this._iS.vehicles = resp as Vehicle[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  async getRrhh() {
    await this._rS.getRrhh().subscribe(resp => {
      this._rS.employees = resp as Employee[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content);
  }

  async getVehicleEmployee() {
    await this._vES.getVehicleEmployee().subscribe(resp => {
      this._vES.vehicleEmployee = resp as any[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  assignVehicleEmployee() {
    this._vES.postVehicleEmployee(this.assignForm.value).subscribe(data => {
      this.getVehicleEmployee().then(() => {
        Swal.fire(
          'Ok!',
          'Vehiculo asignado correctamente',
          'success'
        ).then( () => {
          this.modalService.dismissAll();
        })
      })
    });
  }

}
