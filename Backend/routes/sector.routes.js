const express = require('express');
const router = express.Router();

const sector = require('../controllers/sector.controller');

router.get('/', sector.getSectors);
router.post('/', sector.createSector);
router.put('/:id', sector.editSector);
router.delete('/:id', sector.deleteSector);

module.exports = router;
