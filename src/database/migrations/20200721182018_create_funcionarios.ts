import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('funcionarios', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('cpf').notNullable();
        table.string('email').notNullable();
        table.text('endereco');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('funcionarios');
}

