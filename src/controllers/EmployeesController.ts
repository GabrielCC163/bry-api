import {Request, Response} from 'express';
import knex from '../database/connection';

class EmployeesController {
    async index(request: Request, response: Response) {
        try {
            const employees = await knex('funcionarios')
                .select('*')
                .orderBy('id', 'desc');
    
            const results = [];

            for (let employee of employees) {
                const companies = await knex('funcionario_empresa as fe')
                .join('empresas as e', 'e.id', '=', 'fe.idempresa')
                .where('fe.idfuncionario', employee.id)
                .select('e.*');

                results.push({
                    employee,
                    companies
                });
            }

            if (results.length === 0) {
                return response.status(400).send({message: 'Nenhum funcionário cadastrado.'});   
            }

            return response.status(200).json(results);
        } catch (err) {
            return response.status(500).json({error: err.message});
        }
    };

    async show(request: Request, response: Response) {
        const {id} = request.params;
        
        try {
            const employee = await knex('funcionarios')
            .where('id', id)
            .first();
            console.log(employee);
            
            if (!employee) {
                return response.status(400).send({message: 'Funcionário não encontrado.'});
            }
            
            const companies = await knex('funcionario_empresa as fe')
            .join('empresas as e', 'e.id', '=', 'fe.idempresa')
            .where('fe.idfuncionario', employee.id)
            .select('e.*');
            
            const result = {
                employee,
                companies
            };
            
            return response.status(200).json(result);
        }  catch (err) {
            return response.status(500).json({error: err.message});
        }
    };

    async create(request: Request, response: Response) {
        const {
            nome,
            cpf,
            email,
            endereco,
        } = request.body;

        try {
            const trx = await knex.transaction();
            
            const insertedEmployee = await trx('funcionarios').insert({nome, cpf, email, endereco}).returning('id');
            
            await trx.commit();

            return response.status(200).json({id: insertedEmployee[0]});
        }  catch (err) {
            return response.status(500).json({error: err.message});
        }
    };

    async update(request: Request, response: Response) {
        const {
            nome,
            cpf,
            email,
            endereco,
        } = request.body;

        const {id} = request.params;
   
        try {
            const trx = await knex.transaction();
            
            const updatedEmployee = await trx('funcionarios')
                .where('id', id)
                .update({nome, cpf, email, endereco});
            
            if (!updatedEmployee) {
                return response.status(400).send({message: 'Funcionário não encontrado.'});
            }

            await trx.commit();

            return response.status(200).send();
        }  catch (err) {
            return response.status(500).json({error: err.message});
        }
    }

    async delete (request: Request, response: Response) {
        const {id} = request.params;
   
        try {
            const trx = await knex.transaction();
            
            const deletedEmployee = await trx('funcionarios')
                .where('id', id)
                .del();
            
            if (!deletedEmployee) {
                return response.status(400).send({message: 'Funcionário não encontrado.'});
            }

            await trx.commit();

            return response.status(200).send();
        }  catch (err) {
            return response.status(500).json({error: err.message});
        }
    }
}

export default EmployeesController;