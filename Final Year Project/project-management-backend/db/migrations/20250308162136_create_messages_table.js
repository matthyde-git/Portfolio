/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migration file for creating the messages table

exports.up = function(knex) {
    return knex.schema.createTable("messages", (table) => {
        table.increments("messageid");
        table.integer("projectid");
        table.string("message", 3000).notNullable();
        table.string("user").notNullable();
        table.integer("replyingto");
        table.timestamps(true, true);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("messages");
};
