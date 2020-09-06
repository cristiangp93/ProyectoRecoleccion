const express = require('express');
const router = express.Router();

const vehicleEmployee = require('../controllers/vehicle-employee.controller');

router.get('/', vehicleEmployee.getVehicleEmployee);
router.post('/', vehicleEmployee.createVehicleEmployee);

module.exports = router;
