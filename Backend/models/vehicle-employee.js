const mongoose = require('mongoose');
const {Schema} = mongoose;

const VehicleEmployeeSchema = new Schema({
  vehicle: Schema.Types.Mixed,
  employee: Schema.Types.Mixed,
}, {
  collection: 'vehicle-employee'
});

module.exports = mongoose.model('VehicleEmployee', VehicleEmployeeSchema);
