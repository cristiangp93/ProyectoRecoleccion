export class Route {
  _id: string;
  name: string;
  des: string;
  schedule_begin: string;
  schedule_end: string;
  schedule_days_runs: string[];
  gps: RouteGps[];

  constructor() {
    this._id = '';
    this.name = '';
    this.des = '';
    this.schedule_begin = '';
    this.schedule_end = '';
    this.schedule_days_runs = [];
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
