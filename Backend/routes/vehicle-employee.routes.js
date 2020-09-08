const express = require('express');
const router = express.Router();

const vehicleEmployee = require('../controllers/vehicle-employee.controller');

router.get('/', vehicleEmployee.getVehicleEmployee);
router.post('/', vehicleEmployee.createVehicleEmployee);
router.put('/:id', vehicleEmployee.editVehicleEmployee);
router.delete('/:id', vehicleEmployee.deleteVehicleEmployee);

module.exports = router;
