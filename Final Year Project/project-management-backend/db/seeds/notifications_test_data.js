/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// seed file with test data for the notifications table

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notifications').del()
  await knex('notifications').insert([
    {
      name: "test@email.com",
      message: "Test notification",
      date: "2025-03-02 00:00:00"
    }
  ]);
};
