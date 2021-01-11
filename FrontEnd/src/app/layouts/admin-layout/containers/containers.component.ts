import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContainerService} from "../../../services/container.service";
import {Container} from "../../../models/container";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";

import {InventarioService} from "../../../services/inventario.service";
import {Vehicle} from "../../../models/vehicle";
import {RrhhService} from "../../../services/rrhh.service";
import {Employee} from "../../../models/employee";

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styles: []
})
export class ContainersComponent implements OnInit {
  days = [
    {
      value: 'Lunes',
      des: 'Lunes'
    },
    {
      value: 'Martes',
      des: 'Martes'
    },
    {
      value: 'Miércoles',
      des: 'Miércoles'
    },
    {
      value: 'Jueves',
      des: 'Jueves'
    },
    {
      value: 'Viernes',
      des: 'Viernes'
    },
    {
      value: 'Sábado',
      des: 'Sábado'
    },
    {
      value: 'Domingo',
      des: 'Domingo'
    }
  ];
  lat = -2.7705791;
  lng = -78.8464126;
  zoom = 15;
  loading: boolean;
  isEdit: boolean;

  constructor(private modalService: NgbModal,
              public _cS: ContainerService,
              public _rh: RrhhService,
              public _iS: InventarioService) {
    this.getContainers().then(() => {
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getVehicles();
  }

  async getContainers() {
    this.loading = true;
    this._cS.getContainers().subscribe(resp => {
      this._cS.containers = resp as Container[];
      console.log(this._cS.containers)
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  async getEmployees() {
    await this._rh.getRrhh().subscribe(resp => {
      this._rh.employees = resp as Employee[];
    }, error => {
      console.log(`Error: ${error}`);
    })
  }

  async getVehicles() {
    await this._iS.getVehicles().subscribe(resp => {
      this._iS.vehicles = resp as Vehicle[];
    }, error => {
      console.log(`Error: ${error}`);
    })
  }

  openWindowCustomClass(content3, isEdit: boolean) {
    this.modalService.open(content3, {size: <any>'lg'});
    if (!isEdit) {
      this._cS.selected_container = new Container();
    }
    this.isEdit = isEdit;
  }

  onCheckboxChange(e) {

    if (e.target.checked) {
      this._cS.selected_container.schedule_days_runs.push(e.target.value);
    } else {

      let i: number = 0;
      this._cS.selected_container.schedule_days_runs.forEach((item: string) => {
        if (item == e.target.value) {
          this._cS.selected_container.schedule_days_runs.splice(this._cS.selected_container.schedule_days_runs.indexOf(item), 1);
          return;
        }
        i++;
      });
    }

  }

  placeMarker($event) {
    this._cS.selected_container.lat = $event.coords.lat;
    this._cS.selected_container.lng = $event.coords.lng;
  }

  addContainer(containerForm: NgForm) {
    if (containerForm.invalid) {
      Object.values(containerForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    let auxForm = containerForm.value;

    let aux = {
      ...auxForm,
      ...this._cS.selected_container
    }

    if (containerForm.value._id) {
      this._cS.putContainer(aux).subscribe(data => {
        this.getContainers().then(() => {
          Swal.fire(
            'Ok!',
            'Contenedor actualizado correctamente',
            'success'
          ).then(() => {
            this._cS.selected_container = new Container();
            this._rh.selectedEmployee = new Employee();
            this._iS.selectedVehicle = new Vehicle();
          })
        });
      });
    } else {
      this._cS.postContainer(aux).subscribe(data => {
        this.getContainers().then(() => {
          Swal.fire(
            'Ok!',
            'Contenedor registrado correctamente',
            'success'
          ).then(() => {
            this._cS.selected_container = new Container();
            this._rh.selectedEmployee = new Employee();
            this._iS.selectedVehicle = new Vehicle();
          })
        });
      });
    }

    this.loading = false
    this.modalService.dismissAll();
  }

  editContainer(container: Container) {
    this._cS.selected_container = container;
    this.isEdit = true;
  }

  deleteContainer(_id: string) {
    Swal.fire({
      title: 'Desea eliminar el contenedor?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._cS.deleteContainer(_id)
          .subscribe(res => {
            this.getContainers().then(() => {
              Swal.fire(
                'Ok!',
                'Contenedor eliminado correctamente',
                'success'
              ).then(() => this.loading = false)
            });
          })
      }
    })
  }

}
