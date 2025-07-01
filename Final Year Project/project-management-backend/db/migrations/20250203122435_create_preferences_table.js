/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migration file for creating the preferences table

exports.up = function(knex) {
  return knex.schema.createTable("preferences", (table) => {
    table.increments("preferenceid");
    table.string("user").notNullable();
    table.string("theme").notNullable().defaultTo("dark");
    table.string("fontsize").notNullable().defaultTo("medium");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("preferences");
};
