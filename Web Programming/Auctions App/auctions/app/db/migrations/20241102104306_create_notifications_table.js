/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("notifications", (table) => {
        table.increments("id");
        table.string("email", 100).notNullable().defaultTo("");
        table.string("auctiontitle").notNullable().defaultTo("");
        table.string("message", 500).notNullable().defaultTo("");
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("notifications");
};