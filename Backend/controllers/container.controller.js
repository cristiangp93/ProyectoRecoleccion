const Container = require('../models/container');

const containerCtrl = {};

containerCtrl.getContainers = async (req, res) => {
  await Container.find((err, containers) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(containers);
  });
}

containerCtrl.createContainer = async (req, res) => {
  const container = new Container({
    location: req.body.location,
    cantidad: req.body.cantidad,
    schedule_begin: req.body.schedule_begin,
    schedule_end: req.body.schedule_end,
    schedule_days_runs: req.body.schedule_days_runs,
    lat: req.body.lat,
    lng: req.body.lng,
    vehicle: req.body.vehicle,
    employee: req.body.employee
  });
  console.log(container)
  await container.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    res.json({
      status: 'Contenedor guardado'
    });
  });
}

containerCtrl.getContainer = async (req, res) => {
  await Container.findById(req.params.id, (err, container) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: container
    });
  });
}

containerCtrl.editContainer = async (req, res) => {
  const {id} = req.params;
  const container = {
    location: req.body.location,
    cantidad: req.body.cantidad,
    schedule_begin: req.body.schedule_begin,
    schedule_end: req.body.schedule_end,
    schedule_days_runs: req.body.schedule_days_runs,
    lat: req.body.lat,
    lng: req.body.lng,
    vehicle: req.body.vehicle,
    employee: req.body.employee
  }
  await Container.findByIdAndUpdate(id, {$set: container}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Contenedor actualizado'
    });
  });
}


containerCtrl.deleteContainer = async (req, res) => {
  await Container.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Contenedor eliminado'
    });
  });
}

module.exports = containerCtrl;
