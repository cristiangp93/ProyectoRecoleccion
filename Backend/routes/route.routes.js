const express = require('express');
const router = express.Router();

const route = require('../controllers/route.controller');

router.get('/', route.getRoutes);
router.post('/', route.createRoute);
router.get('/:id', route.getRoute);
router.put('/:id', route.editRoute);
router.delete('/:id', route.deleteRoute);

module.exports = router;