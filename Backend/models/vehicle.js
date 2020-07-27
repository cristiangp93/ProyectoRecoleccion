const mongoose = require('mongoose');
const {Schema} = mongoose;


const VehicleSchema = new Schema({
    descripcion: {type: String, required: true},
    disco: {type: String, required: true},
    marca: {type: String, required: true},
    anio: {type: String, required: true},
    carga: {type: String, required: true},
    capacidad: {type: String, required: true},
    combustible: {type: String, required: true},
    estado: {type: String, required: true}

    },{
    collection: 'vehicles'
    });

    module.exports = mongoose.model('Vehicle', VehicleSchema);
