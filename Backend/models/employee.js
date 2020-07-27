const mongoose = require('mongoose');
const {Schema} = mongoose;

const EmployeeSchema = new Schema({
  name: {type: String, required: true},
  apellido: {type: String, required: true},
  cargo: {type: String, required: true},
  telefono: {type: Number, required: true},
  direccion: {type: String, required: true}
}, {
  collection: 'Employees'
});

module.exports = mongoose.model('Employee', EmployeeSchema);
