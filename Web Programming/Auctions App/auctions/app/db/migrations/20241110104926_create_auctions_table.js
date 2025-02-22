/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("newauctions", (table) => {
        table.increments("id");
        table.string("title").notNullable().defaultTo("");
        table.double("price");
        table.string("description", 2000).notNullable().defaultTo("");
        table.string("category").notNullable().defaultTo("");
        table.string("image").notNullable().defaultTo("");
        table.double("rate");
        table.integer("count");
        table.string("winner");
        table.double("highestBid");
        table.dateTime("deadline");
        table.boolean("notified").defaultTo(false);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("newauctions");
};