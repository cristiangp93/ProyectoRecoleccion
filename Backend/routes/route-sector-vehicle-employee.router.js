const express = require('express');
const router = express.Router();

const routeSectorVehicleEmployee = require('../controllers/route-sector-vehicle-employee.controller');

router.get('/', routeSectorVehicleEmployee.getRoutesSectorVehicleEmployee);
router.post('/', routeSectorVehicleEmployee.createRoutesSectorVehicleEmployee);

module.exports = router;
