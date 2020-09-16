const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoutesSectorVehicleEmployeeSchema = new Schema({
  sectorRoute: Schema.Types.Mixed,
  vehicleEmployee: Schema.Types.Mixed,
}, {
  collection: 'routes-sector-vehicle-employee'
});

module.exports = mongoose.model('RoutesSectorVehicleEmployee', RoutesSectorVehicleEmployeeSchema);
