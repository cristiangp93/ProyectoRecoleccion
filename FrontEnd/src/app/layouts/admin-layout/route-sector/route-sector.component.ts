import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RutasService} from "../../../services/rutas.service";
import {Sector} from "../../../models/sector";
import {Schedule} from "../../../models/schedule";
import {Route} from "../../../models/route";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {RoutesSectorService} from "../../../services/routes-sector.service";
import {VehicleEmployeeService} from "../../../services/vehicle-employee.service";
import {RouteSectorVehicleEmployeeService} from "../../../services/route-sector-vehicle-employee.service";

@Component({
  selector: 'app-route-sector',
  templateUrl: './route-sector.component.html',
  styles: []
})
export class RouteSectorComponent implements OnInit {

  assignForm: FormGroup;
  assignVForm: FormGroup;

  public selectedSector: Sector;

  constructor(private modalService: NgbModal,
              public _rS: RutasService,
              public _rsS: RoutesSectorService,
              public _vES: VehicleEmployeeService,
              public _rSvES: RouteSectorVehicleEmployeeService,
              public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getSectors()
    this.getSchedules();
    this.getRoutes();
    this.getRouteSector();
    this.getVehicleEmployee();
    this.getRouteSectorVehicleEmployee();

    this.assignForm = this.fb.group({
      sector: ['', Validators.required],
      schedule: ['', Validators.required],
      route: ['', Validators.required]
    })

    this.assignVForm = this.fb.group({
      sectorRoute: ['', Validators.required],
      vehicleEmployee: ['', Validators.required]
    });
  }

  async getSectors() {
    await this._rS.getSectors().subscribe(resp => {
      this._rS.sectors = resp as Sector[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  async getSchedules() {
    await this._rS.getSchedules().subscribe(resp => {
      this._rS.schedule = resp as Schedule[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  async getRoutes() {
    await this._rS.getRoutes().subscribe(resp => {
      this._rS.routes = resp as Route[];
    }, error => {
      console.log(`Error: ${error}`);
    })
  }

  openWindowCustomClass(content) {
    this.modalService.open(content);
  }

  async getRouteSector() {
    await this._rsS.getRouteSector().subscribe(resp => {
      this._rsS.routesSector = resp as any[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  async getVehicleEmployee() {
    await this._vES.getVehicleEmployee().subscribe(resp => {
      this._vES.vehicleEmployee = resp as any[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  assignRouteSector() {
    this._rsS.postRouteSector(this.assignForm.value).subscribe(data => {
      this.getRouteSector().then(() => {
        Swal.fire(
          'Ok!',
          'Sector registrado correctamente',
          'success'
        ).then( () => {
          this.modalService.dismissAll();
        })
      })
    });
  }

  deleteRouteSector(_id: string) {
    Swal.fire({
      title: 'Desea eliminar el item?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._rsS.deleteRouteSector(_id)
          .subscribe(res => {
            this.getRouteSector().then(() => {
              Swal.fire(
                'Ok!',
                'Ruta-Vehiculo eliminado correctamente',
                'success'
              )
            });
          });
      }
    })
  }

  async getRouteSectorVehicleEmployee() {
    await this._rSvES.getRouteSectorVehicleEmployee().subscribe(resp => {
      this._rSvES.routesSectorVehicleEmployee = resp as any[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  assignRouteSectorVehicleEmployee() {
    this._rSvES.postRouteSectorVehicleEmployee(this.assignVForm.value).subscribe(data => {
      this.getRouteSectorVehicleEmployee().then(() => {
        Swal.fire(
          'Ok!',
          'Vehiculo asignado a ruta',
          'success'
        ).then( () => {
          this.modalService.dismissAll();
        })
      })
    });
  }

  editRouteSector(routeSector: any) {
    console.log(routeSector);
  }
}
