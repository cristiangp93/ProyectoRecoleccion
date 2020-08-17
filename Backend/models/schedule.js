const mongoose = require('mongoose');
const {Schema} = mongoose;

const ScheduleSchema = new Schema({
  schedule_begin: {type: String, required: true},
  schedule_end: {type: String, required: true},
  schedule_days_runs: {type: [String], required: true}
}, {
  collection: 'schedule'
});

module.exports = mongoose.model('schedule', ScheduleSchema);
