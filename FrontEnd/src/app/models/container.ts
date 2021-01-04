export class Container {
  _id: string;
  location: string;
  cantidad: number;
  schedule_begin: string;
  schedule_end: string;
  schedule_days_runs: string[];
  lat: number;
  lng: number;

  constructor() {
    this._id = '';
    this.location = '';
    this.cantidad = 0;
    this.schedule_begin = '';
    this.schedule_end = '';
    this.schedule_days_runs = [];
    this.lat = -2.7390511;
    this.lng = -78.8468242;
  }

}
