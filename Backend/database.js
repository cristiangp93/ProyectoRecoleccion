const mongoose = require('mongoose');

//const URI = "mongodb+srv://admin:admin@recoleccion.wivae.mongodb.net/recoleccion?retryWrites=true&w=majority" //Alex
const URI = "mongodb+srv://admin:admin@generaldb-upf3c.mongodb.net/recolector?retryWrites=true&w=majority" // Cristian

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(db => console.log('Conectado a DB'))
    .catch(e => console.log('Error:', e));

module.exports = mongoose;
