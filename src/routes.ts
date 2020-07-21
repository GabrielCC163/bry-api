import express from 'express';

import EmployeesController from './controllers/EmployeesController';

const routes = express.Router();

const employeesController = new EmployeesController();

routes.get('/funcionarios', employeesController.index);
routes.get('/funcionarios/:id', employeesController.show);
routes.post('/funcionarios', employeesController.create);
routes.put('/funcionarios/:id', employeesController.update);
routes.delete('/funcionarios/:id', employeesController.delete);


export default routes;