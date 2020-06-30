const User = require('../models/user');

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  await User.find((err, users) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(users);
  });
}

userCtrl.createUser = async (req, res) => {
  const user = new User({
    nickname: req.body.nickname,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol
  });
  await user.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Usuario guardado'
    });
  });
}

userCtrl.getUser = async (req, res) => {
  await User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: user
    });
  });
}

userCtrl.editUser = async (req, res) => {
  const {id} = req.params;
  const user = {
    nickname: req.body.nickname,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol
  }
  await User.findByIdAndUpdate(id, {$set: user}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Usuario actualizado'
    });
  });
}

userCtrl.deleteUser = async (req, res) => {
  console.log(req.params.id);
  await User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Usuario eliminado'
    });
  });
}

module.exports = userCtrl;
