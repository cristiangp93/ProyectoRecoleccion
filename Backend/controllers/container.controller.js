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
    lat: req.body.lat,
    lng: req.body.lng
  });
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
    lat: req.body.lat,
    lng: req.body.lng
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
  console.log(req.params.id);
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
