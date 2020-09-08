const RouteSector = require('../models/routes-sector');

const routeSectorCtrl = {};

routeSectorCtrl.getRoutesSector = async (req, res) => {
  await RouteSector.find((err, routes) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(routes);
  });
}

routeSectorCtrl.createRouteSector = async (req, res) => {
  const route = new RouteSector({
    sector: req.body.sector,
    schedule: req.body.schedule,
    route: req.body.route
  });
  await route.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Ruta asignada a Sector'
    });
  });
}

routeSectorCtrl.editRouteSector = async (req, res) => {
  const {id} = req.params;
  const sector = {
    sector: req.body.sector,
    schedule: req.body.schedule,
    route: req.body.route
  }
  await RouteSector.findByIdAndUpdate(id, {$set: sector}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Ruta-Sector actualizado'
    });
  });
}

routeSectorCtrl.deleteRouteSector = async (req, res) => {
  await RouteSector.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Sector - Ruta eliminado'
    });
  });
}

module.exports = routeSectorCtrl;
