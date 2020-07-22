import express from 'express';

import EmployeesController from './controllers/EmployeesController';
import CompaniesController from './controllers/CompaniesController';

const routes = express.Router();

const employeesController = new EmployeesController();
const companiesController = new CompaniesController();

routes.get('/funcionarios', employeesController.index);
routes.get('/funcionarios/:id', employeesController.show);
routes.post('/funcionarios', employeesController.create);
routes.put('/funcionarios/:id', employeesController.update);
routes.delete('/funcionarios/:id', employeesController.delete);

routes.get('/empresas', companiesController.index);
routes.get('/empresas/:id', companiesController.show);
routes.post('/empresas', companiesController.create);
routes.put('/empresas/:id', companiesController.update);
routes.delete('/empresas/:id', companiesController.delete);

routes.post('/vincularfuncionario', companiesController.vincularFuncionario);
routes.delete('/desvincularfuncionario', companiesController.desvincularFuncionario);

export default routes;
