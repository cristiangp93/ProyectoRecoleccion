const mongoose = require('mongoose');
const {Schema} = mongoose;

const RouteSchema = new Schema({
  name: {type: String, required: true},
  des: {type: String, required: true},
  schedule_begin: {type: String, required: true},
  schedule_end: {type: String, required: true},
  schedule_days_runs: {type: [String], required: true},
  gps: {type: [Schema.Types.Mixed], required: true},
  vehicle: Schema.Types.Mixed,
  employee: Schema.Types.Mixed,
}, {
  collection: 'routes'
});

module.exports = mongoose.model('Route', RouteSchema);
