/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migration file for creating the teammembers table

exports.up = function(knex) {
  return knex.schema.createTable("teammembers", (table) => {
    table.increments("teammemberid");
    table.string("email").notNullable();
    table.integer("projectid");
    table.boolean("acceptedinvite");
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("teammembers");
};
