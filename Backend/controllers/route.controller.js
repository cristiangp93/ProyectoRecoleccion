const Route = require('../models/route');

const routeCtrl = {};

routeCtrl.getRoutes = async (req, res) => {
  await Route.find((err, routes) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(routes);
  });
}

routeCtrl.createRoute = async (req, res) => {
  const route = new Route({
    name: req.body.name,
    gps: req.body.gps
  });
  await route.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Ruta guardada'
    });
  });
}

routeCtrl.getRoute = async (req, res) => {
  await Route.findById(req.params.id, (err, route) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: route
    });
  });
}

routeCtrl.editRoute = async (req, res) => {
  const {id} = req.params;
  const route = {
    location: req.body.location,
    lat: req.body.lat,
    lng: req.body.lng
  }
  await Route.findByIdAndUpdate(id, {$set: route}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Ruta actualizada'
    });
  });
}


routeCtrl.deleteRoute = async (req, res) => {
  console.log(req.params.id);
  await Route.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Ruta eliminado'
    });
  });
}

module.exports = routeCtrl;
