const mongoose = require('mongoose');
const {Schema} = mongoose;


const MaterialSchema = new Schema({
    name: {type: String, required: true},
    cantidad: {type: String, required: true}
    },{
    collection: 'materials'
    });

    module.exports = mongoose.model('material', MaterialSchema);