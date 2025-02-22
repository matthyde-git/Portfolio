
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("orders", (table) => {
        table.increments("id");
        table.string("email", 100).notNullable().defaultTo("");
        table.string("item").notNullable().defaultTo("");
        table.double("price");
        table.string("firstname", 50).notNullable().defaultTo("");
        table.string("lastname", 50).notNullable().defaultTo("");
        table.string("address").notNullable().defaultTo("");
        table.bigInteger("cardnumber");
        table.string("expirydate").notNullable();
        table.integer("cvv");
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("orders");
};