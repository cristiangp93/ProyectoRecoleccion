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
    gps: req.body.gps
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

module.exports = containerCtrl;
