import {Component, OnInit} from '@angular/core';
import {RutasService} from "../../../services/rutas.service";
import {Route} from "../../../models/route";
import {ContainerService} from "../../../services/container.service";
import {Container} from "../../../models/container";

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
    url: 'https://image.flaticon.com/icons/png/512/1686/1686033.png',
    scaledSize: {
      width: 40,
      height: 40
    }
  }
  selectedSector: any;
  selectedContainer: any;

  constructor(public _rS: RutasService,
              public _cS: ContainerService){
  }

  ngOnInit(): void {
    this.getRoutes();
    this.getContainers();
    this.get();

    navigator.permissions.query({ name: 'geolocation' })
      .then((resp) => {
        resp.state === 'denied' ? this.locationAccepted = false : this.locationAccepted = true;
      })

  }



  async getRoutes() {
    await this._rS.getRoutes().subscribe(resp => {
      this._rS.routes = resp as Route[];
    }, error => {
      console.log(`Error: ${error}`);
    })
  }

  async getContainers() {
    this.loading = true;
    this._cS.getContainers().subscribe( resp =>{
      this._cS.containers = resp as Container[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  setSelectedSector(sector ) {
    this.selectedSector = sector;
  }

  setSelectedContainer( container ) {
    this.selectedContainer = container;
    console.log(this.selectedContainer)
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
