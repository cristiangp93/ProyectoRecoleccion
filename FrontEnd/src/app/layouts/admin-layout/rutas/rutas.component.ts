import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RutasService} from "../../../services/rutas.service";
import {Sector} from "../../../models/sector";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {Schedule} from "../../../models/schedule";
import {Route} from "../../../models/route";

declare var google;

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
  // origin = {lat: -2.7705791, lng: -78.8464126};
  origin = {};
  // destination = {lat: -2.7461671, lng: -78.8425931};
  destination = {};
  lat = -2.7705791;
  lng = -78.8464126;
  zoom = 20;
  selectedRoute: Route;
  isEdit: boolean;

  constructor(private modalService: NgbModal,
              public _rS: RutasService) {
  }

  ngOnInit(): void {
    this.getSectors().then(() => {
      this.loading = false;
    })
    this.getSchedules();
    this.getRoutes();
  }

  onCheckboxChange(e) {

    if (e.target.checked) {
      this._rS.selectedSchedule.schedule_days_runs.push(e.target.value);
    } else {
      let i: number = 0;
      this._rS.selectedSchedule.schedule_days_runs.forEach((item: string) => {
        if (item == e.target.value) {
          this._rS.selectedSchedule.schedule_days_runs.splice(this._rS.selectedSchedule.schedule_days_runs.indexOf(item), 1);
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

  async getSectors() {
    this.loading = true;
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

  openWindowCustomClass(content, isEdit: boolean) {
    this.modalService.open(content);
    if (!isEdit) {
      this._rS.selectedSector = new Sector();
      this._rS.selectedSchedule = new Schedule();
      this._rS.selectedRoute = new Route();
    }
    this.isEdit = isEdit;
  }

  addSector(sectorForm: NgForm) {
    if (sectorForm.invalid) {
      Object.values(sectorForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (sectorForm.value._id) {
      this._rS.putSector(sectorForm.value).subscribe(data => {
        this.getSectors().then(() => {
          Swal.fire(
            'Ok!',
            'Sector actualizado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    } else {
      this._rS.postSector(sectorForm.value).subscribe(data => {
        this.getSectors().then(() => {
          Swal.fire(
            'Ok!',
            'Sector registrado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    }

    this._rS.selectedSector = new Sector();
    this.modalService.dismissAll();
  }

  addSchedule(scheduleForm: NgForm) {
    if (scheduleForm.invalid) {
      Object.values(scheduleForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (scheduleForm.value._id) {
      this._rS.putSchedule(scheduleForm.value).subscribe(data => {
        this.getSchedules().then(() => {
          Swal.fire(
            'Ok!',
            'Horario actualizado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    } else {
      const auxItem = {
        ...scheduleForm.value,
        schedule_days_runs: this._rS.selectedSchedule.schedule_days_runs
      }
      this._rS.postSchedule(auxItem).subscribe(data => {
        this.getSchedules().then(() => {
          Swal.fire(
            'Ok!',
            'Horario registrado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    }

    this._rS.selectedSchedule = new Schedule();
    this.modalService.dismissAll();
  }

  /* Agregar marcador al mapa*/
  addMarker( evento: any ) {
    const coords: {lat: number, lng: number} = evento;
    const nuevoMarcador = new Marcador( evento.coords.lat, evento.coords.lng);
    console.log(this.origin['lat'])
    if (this.origin['lat'] === undefined) {
      this.origin = nuevoMarcador;
    } else {
      this.destination = nuevoMarcador;
    }
    console.log(this.origin, this.destination)
    // this._rS.selectedRoute.gps.push(nuevoMarcador);
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

  editSector(sector: Sector) {
    this._rS.selectedSector = sector;
    this.isEdit = this.isEdit;
  }

  editSchedule(schedule: Schedule) {
    this._rS.selectedSchedule = schedule;
    this.isEdit = this.isEdit;
  }

  editRoute( route: Route) {
    this._rS.selectedRoute = route;
    this.isEdit = this.isEdit;
  }

  deleteSector(_id: string) {
    Swal.fire({
      title: 'Desea eliminar el sector?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._rS.deleteSector(_id)
          .subscribe(res => {
            this.getSectors().then(() => {
              Swal.fire(
                'Ok!',
                'Sector eliminado correctamente',
                'success'
              ).then(() => this.loading = false)
            });
          });
      }
    })
  }

  deleteSchedule(_id: string) {
    Swal.fire({
      title: 'Desea eliminar el horario?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._rS.deleteSchedule(_id)
          .subscribe(res => {
            this.getSchedules().then(() => {
              Swal.fire(
                'Ok!',
                'Horario eliminado correctamente',
                'success'
              ).then(() => this.loading = false)
            });
          });
      }
    })
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
