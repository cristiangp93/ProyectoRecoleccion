export class Route {
  _id: string;
  name: string;
  gps: RouteGps[];

  constructor() {
    this._id = '';
    this.name = '';
    this.gps = [];
  }
}

export class RouteGps {
  lat: number;
  lng: number;

  constructor() {
    this.lat = 0;
    this.lng = 0;
  }
}
