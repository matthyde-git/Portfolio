/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migration file for creating the risks table

exports.up = function(knex) {
    return knex.schema.createTable("risks", (table) => {
        table.increments("riskid");
        table.integer("projectid");
        table.string("title").notNullable();;
        table.string("category").notNullable();;
        table.string("impact").notNullable();;
        table.integer("impactlevel");
        table.integer("likelihood");
        table.string("control", 2000).notNullable();
        table.string("response", 2000).notNullable();
        table.integer("priority");
        table.timestamps(true, true);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("risks");
};
