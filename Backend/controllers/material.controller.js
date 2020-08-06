const Material = require('../models/material');

const materialCtrl = {};


materialCtrl.getMaterials = async (req, res) => {
  await Material.find((err, materials) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(materials);
  });
}

materialCtrl.createMaterial = async (req, res) => {
  const material = new Material({
    name: req.body.name,
    cantidad: req.body.cantidad
  });
  await material.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Material guardado'
    });
  });
}

materialCtrl.getMaterial = async (req, res) => {
  await Material.findById(req.params.id, (err, material) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: material
    });
  });
}

materialCtrl.editMaterial = async (req, res) => {
  const {id} = req.params;
  const material = {
    name: req.body.name,
    cantidad: req.body.cantidad
  }
  await Material.findByIdAndUpdate(id, {$set: material}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Material actualizado'
    });
  });
}


 materialCtrl.deleteMaterial = async (req, res) => {
  console.log(req.params.id);
  await Material.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Material eliminado'
    });
  });
}
module.exports = materialCtrl;
