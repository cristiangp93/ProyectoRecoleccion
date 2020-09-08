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

vehicleEmployeeCtrl.editVehicleEmployee  = async (req, res) => {
  const {id} = req.params;
  const sector = {
    vehicle: req.body.vehicle,
    employee: req.body.employee
  }
  await VehicleEmployee.findByIdAndUpdate(id, {$set: sector}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Vehiculo-empleado actualizado'
    });
  });
}

vehicleEmployeeCtrl.deleteVehicleEmployee  = async (req, res) => {
  await VehicleEmployee.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Vehiculo-empleado eliminado'
    });
  });
}

module.exports = vehicleEmployeeCtrl;
