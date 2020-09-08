const express = require('express');
const router = express.Router();

const routeSector = require('../controllers/routes-sector.controller');

router.get('/', routeSector.getRoutesSector);
router.post('/', routeSector.createRouteSector);
router.put('/:id', routeSector.editRouteSector);
router.delete('/:id', routeSector.deleteRouteSector);

module.exports = router;
