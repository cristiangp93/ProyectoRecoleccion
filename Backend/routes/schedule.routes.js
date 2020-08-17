const express = require('express');
const router = express.Router();

const schedule = require('../controllers/schedule.controller');

router.get('/', schedule.getSchedules);
router.post('/', schedule.createSchedule);
router.put('/:id', schedule.editSchedule);
router.delete('/:id', schedule.deleteSchedule);

module.exports = router;
