const mongoose = require('mongoose');
const {Schema} = mongoose;

const EmployeeSchema = new Schema({
  name: {type: String, required: true},
  apellido: {type: String, required: true},
  cargo: {type: String, required: true},
  telefono: {type: String, required: true},
  direccion: {type: String, required: true}
}, {
  collection: 'employees'
});

module.exports = mongoose.model('Employee', EmployeeSchema);
