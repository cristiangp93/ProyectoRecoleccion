const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContainerSchema = new Schema({
  location: {type: String, required: true},
  cantidad: {type: Number, required: true},
  schedule_begin: {type: String, required: true},
  schedule_end: {type: String, required: true},
  schedule_days_runs: {type: [String], required: true},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  vehicle: Schema.Types.Mixed,
  employee: Schema.Types.Mixed,
}, {
  collection: 'containers'
});

module.exports = mongoose.model('Container', ContainerSchema);
