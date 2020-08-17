const mongoose = require('mongoose');
const {Schema} = mongoose;

const SectorSchema = new Schema({
  name: {type: String, required: true},
  des: {type: String, required: true}
}, {
  collection: 'sectors'
});

module.exports = mongoose.model('sector', SectorSchema);
