import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('empresas', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('cnpj').notNullable();
        table.text('endereco');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('empresas');
}

