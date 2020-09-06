const VehicleEmployee = require('../models/vehicle-employee');

const vehicleEmployeeCtrl = {};

vehicleEmployeeCtrl.getVehicleEmployee = async (req, res) => {
  await VehicleEmployee.find((err, vehicleEmployees) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(vehicleEmployees);
  });
}

vehicleEmployeeCtrl.createVehicleEmployee = async (req, res) => {
  const vehicleEmployee = new VehicleEmployee({
    vehicle: req.body.vehicle,
    employee: req.body.employee
  });
  await vehicleEmployee.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Vehiculo asignado a empleados'
    });
  });
}

module.exports = vehicleEmployeeCtrl;
