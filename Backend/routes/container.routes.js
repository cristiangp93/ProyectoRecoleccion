const express = require('express');
const router = express.Router();

const container = require('../controllers/container.controller');

router.get('/', container.getContainers);
router.post('/', container.createContainer);

module.exports = router;
