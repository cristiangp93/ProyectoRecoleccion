const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoutesSctorSchema = new Schema({
  sector: Schema.Types.Mixed,
  schedule: Schema.Types.Mixed,
  route: Schema.Types.Mixed
}, {
  collection: 'routes-sector'
});

module.exports = mongoose.model('RoutesSector', RoutesSctorSchema);
