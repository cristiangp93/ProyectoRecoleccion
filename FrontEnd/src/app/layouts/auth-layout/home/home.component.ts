import { Component, OnInit } from '@angular/core';
import {Route} from "../../../models/route";
import {RutasService} from "../../../services/rutas.service";
import {Sector} from "../../../models/sector";

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

  constructor(public _rS: RutasService) { }

  ngOnInit(): void {
    this.getSectors();
  }

  async getSectors() {
    await this._rS.getSectors().subscribe(resp => {
      this._rS.sectors = resp as Sector[];
      console.log(this._rS.sectors);
    }, error => {
      console.log(`Error: ${error}`);
    });
  }


}
