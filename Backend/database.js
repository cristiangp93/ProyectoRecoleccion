const mongoose = require('mongoose');

const URI = "mongodb+srv://admin:admin@generaldb-upf3c.mongodb.net/recolector?retryWrites=true&w=majority"

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(db => console.log('Conectado a DB'))
    .catch(e => console.log('Error:', e));

module.exports = mongoose;
