const mongoose = require('mongoose');
const {Schema} = mongoose;

const MaterialSchema = new Schema({
  name: {type: String, required: true},
  cantidad: {type: Number, required: true}
}, {
  collection: 'materials'
});

module.exports = mongoose.model('material', MaterialSchema);
