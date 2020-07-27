const express = require('express');
const router = express.Router();

const material = require('../controllers/material.contoller');

router.get('/', material.getMaterials);
router.post('/', material.createMaterial);
router.get('/:id', material.getMaterial);
router.put('/:id', material.editMaterial);
router.delete('/:id', material.deleteMaterial);

module.exports = router;