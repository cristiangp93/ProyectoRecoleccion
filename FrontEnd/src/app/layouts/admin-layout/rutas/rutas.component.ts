import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RutasService} from "../../../services/rutas.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {Route} from "../../../models/route";


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
              public _rS: RutasService) {
  }

  ngOnInit(): void {
    this.getRoutes();


  }

 assignRoute(route: Route) {
    this.selectedRoute = route;
    this.lat = this.selectedRoute.gps[0].lat;
    this.lng = this.selectedRoute.gps[0].lng;
  }

  async getRoutes() {
    await this._rS.getRoutes().subscribe(resp => {
      this._rS.routes = resp as Route[];
    }, error => {
      console.log(`Error: ${error}`);
    })
  }

  openWindowCustomClass(content, isEdit: boolean) {
    this.modalService.open(content);
    if (!isEdit) {
      this._rS.selectedRoute = new Route();
    }
    this.isEdit = isEdit;
  }

  /* Agregar marcador al mapa*/
  addMarker( evento: any ) {
    const coords: {lat: number, lng: number} = evento;
    const nuevoMarcador = new Marcador( evento.coords.lat, evento.coords.lng);
    this._rS.selectedRoute.gps.push(nuevoMarcador);
  }

  eraseMarker(index: number) {
    this._rS.selectedRoute.gps.splice( index, 1);
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
      gps: this._rS.selectedRoute.gps
    }

    this._rS.postRoutes(auxItem).subscribe(data => {
      this.getRoutes().then(() => {
        Swal.fire(
          'Ok!',
          'Ruta registrada correctamente',
          'success'
        ).then(() => this.loading = false)
      });
    });

    this._rS.selectedRoute = new Route();
    this.modalService.dismissAll();
  }

  editRoute( route: Route) {
    this._rS.selectedRoute = route;
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
        this._rS.deleteRoute(_id)
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
