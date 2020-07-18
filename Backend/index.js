const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const {mongoose} = require('./database');

// Settings
app.set('PORT', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev')); // nos permite ver el tipo de solicitud, además del tiempo de ejecución
app.use(express.json()); // leer peticiones en formato JSON
app.use(cors({origin: 'http://localhost:4200'})); // habilita las solicitudes de peticiones desde origenes fuera de red local

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/containers', require('./routes/container.routes'));

// Starting server
app.listen(app.get('PORT'), () => {
  console.log(`Server on port: ${app.get('PORT')}`)
});
