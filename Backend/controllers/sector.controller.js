const Sector = require('../models/sector');

const sectorCtrl = {};

sectorCtrl.getSectors = async (req, res) => {
  await Sector.find((err, sectors) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(sectors);
  });
}

sectorCtrl.createSector = async (req, res) => {
  const sector = new Sector({
    name: req.body.name,
    des: req.body.des
  });
  await sector.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Sector guardado'
    });
  });
}

sectorCtrl.editSector = async (req, res) => {
  const {id} = req.params;
  const sector = {
    name: req.body.name,
    des: req.body.des
  }
  await Sector.findByIdAndUpdate(id, {$set: sector}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Sector actualizado'
    });
  });
}

sectorCtrl.deleteSector = async (req, res) => {
  await Sector.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Sector eliminado'
    });
  });
}

module.exports = sectorCtrl;
