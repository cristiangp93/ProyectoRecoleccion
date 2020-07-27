const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContainerSchema = new Schema({
  location: {type: String, required: true},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true}
}, {
  collection: 'containers'
});

module.exports = mongoose.model('Container', ContainerSchema);
