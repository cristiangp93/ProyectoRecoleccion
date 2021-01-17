const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const {mongoose} = require('./database');

// Settings
app.set('PORT', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/containers', require('./routes/container.routes'));
app.use('/api/vehicles', require('./routes/vehicle.routes'));
app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/routes', require('./routes/route.routes'));


// Starting server
app.listen(app.get('PORT'), () => {
  console.log(`Server on port: ${app.get('PORT')}`)
});
