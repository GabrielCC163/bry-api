import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('funcionario_empresa', (table) => {
        table.increments('id').primary();
        table.integer('idfuncionario').notNullable().references('id').inTable('funcionarios');
        table.integer('idempresa').notNullable().references('id').inTable('empresas');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('funcionario_empresa');
}

