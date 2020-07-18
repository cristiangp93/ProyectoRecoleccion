const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  nickname: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  rol: {type: String, required: true}
}, {
  collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);
