const express = require('express');
const router = express.Router();

const container = require('../controllers/container.controller');

router.get('/', container.getContainers);
router.post('/', container.createContainer)
router.get('/:id', container.getContainer);
router.put('/:id', container.editContainer);
router.delete('/:id', container.deleteContainer);

module.exports = router;
