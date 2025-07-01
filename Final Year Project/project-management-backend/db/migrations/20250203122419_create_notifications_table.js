/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migration file for creating the notifications table

exports.up = function(knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.increments("notificationid");
    table.string("name").notNullable();
    table.string("message").notNullable();
    table.dateTime("date");
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("notifications");
};
