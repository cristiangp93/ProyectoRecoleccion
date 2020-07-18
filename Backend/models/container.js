const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContainerSchema = new Schema({
  location: {type: String, required: true},
  gps: Schema.Types.Mixed
}, {
  collection: 'containers'
});

module.exports = mongoose.model('Container', ContainerSchema);
