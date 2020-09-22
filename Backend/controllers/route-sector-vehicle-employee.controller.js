const RouteSectorVehicleEmployee = require('../models/routes-sector-vehicle-employee');

const routeSectorVehicleEmployee = {};

routeSectorVehicleEmployee.getRoutesSectorVehicleEmployee = async (req, res) => {
  await RouteSectorVehicleEmployee.find((err, routes) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(routes);
  });
}

routeSectorVehicleEmployee.createRoutesSectorVehicleEmployee = async (req, res) => {
  const route = new RouteSectorVehicleEmployee({
    sectorRoute: req.body.sectorRoute,
    vehicleEmployee: req.body.vehicleEmployee,
  });
  await route.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Vehiculo asignado a Ruta'
    });
  });
}

module.exports = routeSectorVehicleEmployee;
