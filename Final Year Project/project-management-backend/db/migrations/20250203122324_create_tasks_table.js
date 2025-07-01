/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migration file for creating the tasks table

exports.up = function(knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("taskid");
    table.string("title").notNullable();
    table.string("description", 2000).notNullable();
    table.string("status").notNullable();
    table.string("assignedto").notNullable().defaultTo("Unassigned");
    table.dateTime("deadline");
    table.integer("projectid");
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("tasks");
};
