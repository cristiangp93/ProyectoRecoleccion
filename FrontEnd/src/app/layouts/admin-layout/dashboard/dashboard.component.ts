import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../variables/charts";
import {RutasService} from "../../../services/rutas.service";
import {ContainerService} from "../../../services/container.service";
import {Container} from "../../../models/container";
import {Route} from "../../../models/route";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public icon = {
    url: 'https://image.flaticon.com/icons/png/512/1686/1686033.png',
    scaledSize: {
      width: 40,
      height: 40
    }
  }
  public renderOptions = {
    suppressMarkers: true
  };

  constructor(public _rS: RutasService,
              public _cS: ContainerService) { }

  ngOnInit() {
    this.getContainers();
    this.getRoutes();
  }

  async getContainers() {
    this._cS.getContainers().subscribe( resp =>{
      this._cS.containers = resp as Container[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  async getRoutes() {
    await this._rS.getRoutes().subscribe(resp => {
      this._rS.routes = resp as Route[];
      console.log(this._rS.routes)
    }, error => {
      console.log(`Error: ${error}`);
    })
  }

}
