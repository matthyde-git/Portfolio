/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migration file for creating the projects table

exports.up = function(knex) {
  return knex.schema.createTable("projects", (table) => {
    table.increments("projectid");
    table.string("title").notNullable();
    table.string("teamleader").notNullable();
    table.string("description", 3000).notNullable();
    table.string("status").notNullable();
    table.dateTime("deadline");
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("projects");
};
