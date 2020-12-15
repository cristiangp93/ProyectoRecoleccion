import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RutasService} from "../../../services/rutas.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {Route} from "../../../models/route";

import {InventarioService} from "../../../services/inventario.service";
import {Vehicle} from "../../../models/vehicle";
import {RrhhService} from "../../../services/rrhh.service";
import {Employee} from "../../../models/employee";

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styles: []
})
export class RutasComponent implements OnInit {

  loading: boolean;
  days = [
    {
      value: 'mon',
      des: 'Lunes'
    },
    {
      value: 'thu',
      des: 'Martes'
    },
    {
      value: 'wed',
      des: 'Miércoles'
    },
    {
      value: 'thr',
      des: 'Jueves'
    },
    {
      value: 'fri',
      des: 'Viernes'
    },
    {
      value: 'sat',
      des: 'Sábado'
    },
    {
      value: 'sun',
      des: 'Domingo'
    }
  ];
  lat = -2.7705791;
  lng = -78.8464126;
  zoom = 20;
  selectedRoute: Route;
  isEdit: boolean;

  constructor(private modalService: NgbModal,
              public _rt: RutasService,
              public _iS: InventarioService,
              public _rS: RrhhService) {
  }

  ngOnInit(): void {
    this.getRoutes();

  }

  onCheckboxChange(e) {

    if (e.target.checked) {
      this._rt.selectedRoute.schedule_days_runs.push(e.target.value);
    } else {
      let i: number = 0;
      this._rt.selectedRoute.schedule_days_runs.forEach((item: string) => {
        if (item == e.target.value) {
          this._rt.selectedRoute.schedule_days_runs.splice(this._rt.selectedRoute.schedule_days_runs.indexOf(item), 1);
          return;
        }
        i++;
      });
    }

  }

 assignRoute(route: Route) {
    this.selectedRoute = route;
    this.lat = this.selectedRoute.gps[0].lat;
    this.lng = this.selectedRoute.gps[0].lng;
  }

  async getRoutes() {
    await this._rt.getRoutes().subscribe(resp => {
      this._rt.routes = resp as Route[];
    }, error => {
      console.log(`Error: ${error}`);
    })
  }

  openWindowCustomClass(content, isEdit: boolean) {
    this.modalService.open(content);
    if (!isEdit) {
      this._rt.selectedRoute = new Route();
    }
    this.isEdit = isEdit;
  }

  /* Agregar marcador al mapa*/
  addMarker( evento: any ) {
    const coords: {lat: number, lng: number} = evento;
    const nuevoMarcador = new Marcador( evento.coords.lat, evento.coords.lng);
    this._rt.selectedRoute.gps.push(nuevoMarcador);
  }

  eraseMarker(index: number) {
    this._rt.selectedRoute.gps.splice( index, 1);
  }

  addRoute(routeForm: NgForm) {
    if (routeForm.invalid) {
      Object.values(routeForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const auxItem = {
      ...routeForm.value,
      gps: this._rt.selectedRoute.gps,

      ...routeForm.value, schedule_days_runs:
      this._rt.selectedRoute.schedule_days_runs
    }

    if (routeForm.value._id) {
      this._rt.putRoutes(routeForm.value).subscribe(data => {
        this.getRoutes().then(() => {
          Swal.fire(
            'Ok!',
            'Ruta actualizado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    }else{

    this._rt.postRoutes(auxItem).subscribe(data => {
      this.getRoutes().then(() => {
        Swal.fire(
          'Ok!',
          'Ruta registrada correctamente',
          'success'
        ).then(() => this.loading = false)
      });
    });
  }

    this._rt.selectedRoute = new Route();
    this.modalService.dismissAll();
  }

  editRoute( route: Route) {
    this._rt.selectedRoute = route;
    this.isEdit = this.isEdit;
  }

  deleteRoute(_id: string) {
    Swal.fire({
      title: 'Desea eliminar la ruta?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._rt.deleteRoute(_id)
          .subscribe(res => {
            this.getRoutes().then(() => {
              Swal.fire(
                'Ok!',
                'Ruta eliminada correctamente',
                'success'
              ).then(() => this.loading = false)
            });
          });
      }
    })
  }

}

export class Marcador {
  public lat: number;
  public lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
