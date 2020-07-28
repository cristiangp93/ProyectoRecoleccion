const mongoose = require('mongoose');
const {Schema} = mongoose;

const RouteSchema = new Schema({
  location: {type: String, required: true},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true}
}, {
  collection: 'routes'
});

module.exports = mongoose.model('Route', RouteSchema);
