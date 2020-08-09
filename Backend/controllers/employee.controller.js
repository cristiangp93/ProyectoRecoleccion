const Employee = require('../models/employee');

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
  await Employee.find((err, Employees) => {
    if (err) {
      console.log('Error:', err);
      return
    }

    res.json(Employees);
  });
}

employeeCtrl.createEmployee = async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    apellido: req.body.surname,
    cargo: req.body.cargo,
    telefono: req.body.telefono,
    direccion: req.body.direccion
  });
  await employee.save((err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Empleado guardado'
    });
  });
}

employeeCtrl.getEmployee = async (req, res) => {
  await Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: employee
    });
  });
}

employeeCtrl.editEmployee = async (req, res) => {
  const {id} = req.params;
  const employee = {
    name: req.body.name,
    apellido: req.body.surname,
    cargo: req.body.cargo,
    telefono: req.body.telefono,
    direccion: req.body.direccion
  }
  await Employee.findByIdAndUpdate(id, {$set: employee}, {new: true}, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Empleado actualizado'
    });
  });
}

employeeCtrl.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }

    res.json({
      status: 'Empleado eliminado'
    });
  });
}

module.exports = employeeCtrl;
