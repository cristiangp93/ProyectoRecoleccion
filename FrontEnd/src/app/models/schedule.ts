export class Schedule {
  _id: string;
  schedule_begin: string;
  schedule_end: string;
  schedule_days_runs: string[];

  constructor() {
    this._id = '';
    this.schedule_begin = '';
    this.schedule_end = '';
    this.schedule_days_runs = [];
  }
}
