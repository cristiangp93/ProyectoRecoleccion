import {Component, OnInit} from '@angular/core';
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
  lat: number;
  lng: number;
  zoom = 15;
  loading: boolean;
  locationAccepted: boolean;
  /* Variables */
  public icon = {
    url: 'http://earth.google.com/images/kml-icons/track-directional/track-4.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }
  sectorForm: FormGroup;
  selectedSector: any;

  constructor(public _rSvES: RouteSectorVehicleEmployeeService,
              public _rS: RutasService,
              public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getSectors();
    this.getRouteSectorVehicleEmployee();
    this.get();

    this.sectorForm = this.fb.group({
      sector: ['', Validators.required],
    });

    navigator.permissions.query({ name: 'geolocation' })
      .then((resp) => {
        resp.state === 'denied' ? this.locationAccepted = false : this.locationAccepted = true;
      })

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

  setSelected() {
    this.selectedSector = this.sector;
  }

  get sector() {
    return this.sectorForm.get('sector').value;
  }

  get(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      })
    }

  }

}
