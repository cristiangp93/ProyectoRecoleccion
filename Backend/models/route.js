const mongoose = require('mongoose');
const {Schema} = mongoose;

const RouteSchema = new Schema({
  name: {type: String, required: true},
  gps: {type: [Schema.Types.Mixed], required: true}
}, {
  collection: 'routes'
});

module.exports = mongoose.model('Route', RouteSchema);
