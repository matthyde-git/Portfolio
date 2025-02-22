/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("contacts", (table) => {
      table.increments("id");
      table.string("firstname", 50).notNullable().defaultTo("");
      table.string("lastname", 50).notNullable().defaultTo("");
      table.string("email", 100).notNullable().defaultTo("");
      table.string("message").notNullable().defaultTo("");
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("contacts");
  };