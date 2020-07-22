import { Request, Response } from 'express';
import knex from '../database/connection';

class CompaniesController {
	async index(request: Request, response: Response) {
		try {
			const companies = await knex('empresas').select('*').orderBy('id', 'desc');

			if (companies.length === 0) {
				return response.status(400).send({ message: 'Nenhuma empresa cadastrada.' });
			}

			const results = [];

			for (let company of companies) {
				const employees = await knex('funcionario_empresa as fe')
					.join('funcionarios as f', 'f.id', '=', 'fe.idfuncionario')
					.where('fe.idempresa', company.id)
					.select('f.*');

				results.push({
					company,
					employees
				});
			}

			return response.status(200).json(results);
		} catch (err) {
			return response.status(500).json({ error: err.message });
		}
	}

	async show(request: Request, response: Response) {
		const { id } = request.params;

		try {
			const company = await knex('empresas').where('id', id).first();

			if (!company) {
				return response.status(400).send({ message: 'Empresa não encontrada.' });
			}

			const employees = await knex('funcionario_empresa as fe')
				.join('funcionarios as f', 'f.id', '=', 'fe.idfuncionario')
				.where('fe.idempresa', company.id)
				.select('f.*');

			const result = {
				company,
				employees
			};

			return response.status(200).json(result);
		} catch (err) {
			return response.status(500).json({ error: err.message });
		}
	}

	async create(request: Request, response: Response) {
		const { nome, cnpj, endereco } = request.body;

		try {
			const trx = await knex.transaction();

			const insertedCompany = await trx('empresas').insert({ nome, cnpj, endereco }).returning('id');

			await trx.commit();

			return response.status(200).json({ id: insertedCompany[0] });
		} catch (err) {
			return response.status(500).json({ error: err.message });
		}
	}

	async update(request: Request, response: Response) {
		const { nome, cnpj, endereco } = request.body;

		const { id } = request.params;

		try {
			const trx = await knex.transaction();

			const updatedCompany = await trx('empresas').where('id', id).update({ nome, cnpj, endereco });

			if (!updatedCompany) {
				return response.status(400).send({ message: 'Empresa não encontrada.' });
			}

			await trx.commit();

			return response.status(200).send();
		} catch (err) {
			return response.status(500).json({ error: err.message });
		}
	}

	async delete(request: Request, response: Response) {
		const { id } = request.params;

		try {
			const trx = await knex.transaction();

			const deletedCompany = await trx('empresas').where('id', id).del();

			if (!deletedCompany) {
				return response.status(400).send({ message: 'Empresa não encontrada.' });
			}

			await trx.commit();

			return response.status(200).send();
		} catch (err) {
			return response.status(500).json({ error: err.message });
		}
	}

	async vincularFuncionario(request: Request, response: Response) {
		const { idfuncionario, idempresa } = request.body;

		try {
			const companies = typeof idempresa === 'object' ? idempresa : Array.of(idempresa);
			const employee = await knex('funcionarios').where('id', idfuncionario).first();

			if (!employee) {
				return response.status(400).send({ message: 'Funcionário não encontrado.' });
			}

			for (let id of companies) {
				const company = await knex('empresas').where('id', id).first();

				if (company) {
					const already = await knex('funcionario_empresa')
						.where({
							idfuncionario,
							idempresa: id
						})
						.first();

					if (!already) {
						const trx = await knex.transaction();

						await trx('funcionario_empresa').insert({
							idfuncionario,
							idempresa: id
						});

						await trx.commit();
					}
				}
			}

			return response.status(200).send();
		} catch (err) {
			return response.status(500).json({ error: err.message });
		}
	}

	async desvincularFuncionario(request: Request, response: Response) {
		const { idfuncionario, idempresa } = request.body;

		try {
			const companies = typeof idempresa === 'object' ? idempresa : Array.of(idempresa);
			const employee = await knex('funcionarios').where('id', idfuncionario).first();

			if (!employee) {
				return response.status(400).send({ message: 'Funcionário não encontrado.' });
			}

			const trx = await knex.transaction();

			await trx('funcionario_empresa')
				.where({
					idfuncionario
				})
				.whereIn('idempresa', companies)
				.del();

			await trx.commit();

			return response.status(200).send();
		} catch (err) {
			return response.status(500).json({ error: err.message });
		}
	}
}

export default CompaniesController;
