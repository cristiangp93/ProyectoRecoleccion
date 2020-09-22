import { Component, OnInit } from '@angular/core';
import {RutasService} from "../../../services/rutas.service";
import {Sector} from "../../../models/sector";
import {RouteSectorVehicleEmployeeService} from "../../../services/route-sector-vehicle-employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lat = -2.7705791;
  lng = -78.8464126;
  zoom = 15;
  loading: boolean;
  /* Variables */
  sectorForm: FormGroup;
  selectedSector: any;

  constructor(public _rSvES: RouteSectorVehicleEmployeeService,
              public _rS: RutasService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getSectors();
    this.getRouteSectorVehicleEmployee();

    this.sectorForm = this.fb.group({
      sector: ['', Validators.required],
    });

  }

  async getSectors() {
    await this._rS.getSectors().subscribe(resp => {
      this._rS.sectors = resp as Sector[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  async getRouteSectorVehicleEmployee() {
    await this._rSvES.getRouteSectorVehicleEmployee().subscribe(resp => {
      this._rSvES.routesSectorVehicleEmployee = resp as any[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  setSelected(){
    this.selectedSector = this.sector;
    console.log(this.selectedSector.sectorRoute.route.gps);
  }

  get sector() {
    return this.sectorForm.get('sector').value;
  }

}
