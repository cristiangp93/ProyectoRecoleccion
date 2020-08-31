const mongoose = require('mongoose');
const {Schema} = mongoose;

const RouteSchema = new Schema({
  location: {type: String, required: true},
  gps: {type: [Schema.Types.Mixed], required: true}
}, {
  collection: 'routes'
});

module.exports = mongoose.model('Route', RouteSchema);
