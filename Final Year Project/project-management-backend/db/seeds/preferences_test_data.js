/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// seed file with test data for the preferences table

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('preferences').del()
  await knex('preferences').insert([
    {
      user: "test@email.com",
      theme: "light",
      fontsize: "large"
    }
  ]);
};
