const Schedule = require('../models/schedule');

const scheduleCtrl = {};

scheduleCtrl.getSchedules = async (req, res) => {
  await Schedule.find((err, schedules) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(schedules);
  });
}

scheduleCtrl.createSchedule = async (req, res) => {
  const schedule = new Schedule({
    schedule_begin: req.body.schedule_begin,
    schedule_end: req.body.schedule_end,
    schedule_days_runs: req.body.schedule_days_runs
  });
  await schedule.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Horario guardado'
    });
  });
}

scheduleCtrl.editSchedule = async (req, res) => {
  const {id} = req.params;
  const schedule = {
    schedule_begin: req.body.schedule_begin,
    schedule_end: req.body.schedule_end,
    schedule_days_runs: req.body.schedule_days_runs
  }
  await Schedule.findByIdAndUpdate(id, {$set: schedule}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Horario actualizado'
    });
  });
}

scheduleCtrl.deleteSchedule = async (req, res) => {
  await Schedule.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Horario eliminado'
    });
  });
}

module.exports = scheduleCtrl;
