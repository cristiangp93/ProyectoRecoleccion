import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RutasService} from "../../../services/rutas.service";
import {Sector} from "../../../models/sector";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {Schedule} from "../../../models/schedule";

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
  ]

  constructor(private modalService: NgbModal,
              public _rS: RutasService) {
  }

  ngOnInit(): void {
    this.getSectors().then(() => {
      this.loading = false;
    })
    this.getSchedules();
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

  openWindowCustomClass(content) {
    this.modalService.open(content);
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

  editSector(sector: Sector) {
    this._rS.selectedSector = sector;
  }

  editSchedule(schedule: Schedule) {
    this._rS.selectedSchedule = schedule;
  }

  deleteSector(_id: string) {
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

  deleteSchedule(_id: string) {
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


}
