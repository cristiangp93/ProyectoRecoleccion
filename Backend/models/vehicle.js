const mongoose = require('mongoose');
const {Schema} = mongoose;

const VehicleSchema = new Schema({
  descripcion: {type: String, required: true},
  disco: {type: Number, required: true},
  marca: {type: String, required: true},
  anio: {type: Number, required: true},
  carga: {type: String, required: true},
  capacidad: {type: Number, required: true},
  combustible: {type: String, required: true},
  estado: {type: String, required: true}
}, {
  collection: 'vehicles'
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
