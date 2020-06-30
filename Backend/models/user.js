const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  nickname: {type: String, required: true, unique: true},
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  rol: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);
