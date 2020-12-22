export class Container {
  _id: string;
  location: string;
  schedule_begin: string;
  schedule_days_runs: string[];
  lat: number;
  lng: number;

  constructor() {
    this._id = '';
    this.location = '';
    this.schedule_begin = '';
    this.schedule_days_runs = [];
    this.lat = -2.7390511;
    this.lng = -78.8468242;
  }

}
