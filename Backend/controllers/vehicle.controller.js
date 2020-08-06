const Vehicle = require('../models/vehicle');

const vehicleCtrl = {};

vehicleCtrl.getVehicles = async (req, res) => {
  await Vehicle.find((err, vehicles) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(vehicles);
  });
}

vehicleCtrl.createVehicle = async (req, res) => {
  const vehicle = new Vehicle({
    descripcion: req.body.descripcion,
    disco: req.body.disco,
    marca: req.body.marca,
    anio: req.body.anio,
    carga: req.body.carga,
    capacidad: req.body.capacidad,
    combustible: req.body.combustible,
    estado: req.body.estado
  });
  await vehicle.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Vehiculo guardado'
    });
  });
}

vehicleCtrl.getVehicle = async (req, res) => {
  await Vehicle.findById(req.params.id, (err, vehicle) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: vehicle
    });
  });
}

vehicleCtrl.editVehicle = async (req, res) => {
  const {id} = req.params;
  const vehicle = {
    descripcion: req.body.descripcion,
    disco: req.body.disco,
    marca: req.body.marca,
    anio: req.body.anio,
    carga: req.body.carga,
    capacidad: req.body.capacidad,
    combustible: req.body.combustible,
    estado: req.body.estado
  }
  await Vehicle.findByIdAndUpdate(id, {$set: vehicle}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Vehiculo actualizado'
    });
  });
}

 vehicleCtrl.deleteVehicle = async (req, res) => {
  console.log(req.params.id);
  await Vehicle.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Vehiculo eliminado'
    });
  });
}
module.exports = vehicleCtrl;
