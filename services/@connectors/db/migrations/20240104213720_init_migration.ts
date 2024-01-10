import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create Roles Table
    knex.schema.createTable('roles', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.timestamps({
            useTimestamps: true,
            defaultToNow: true
        });
    });

    // Create Users Table
    knex.schema.createTable('users', function (table) {
        table.increments("id").primary();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps({
            useTimestamps: true,
            defaultToNow: true
        })
    });

    // Create Role User Table
    knex.schema.createTable('role_user', function (table) {
        table.increments('id').primary();
        table.integer('user_id');
        table.integer('role_id');

        table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
        table.foreign('role_id').references('id').inTable('roles').onUpdate('CASCADE').onDelete('CASCADE')
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('users');
    knex.schema.dropTable('roles');
    knex.schema.dropTable('role_user');
}

