/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migration file for creating the contacts table

exports.up = function(knex) {
  return knex.schema.createTable("contacts", (table) => {
    table.increments("id");
    table.string("email", 100).notNullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("contacts");
};
