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
  console.log(req.body);
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

module.exports = routeSectorCtrl;
