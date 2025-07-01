/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// seed file with test data for the teammembers table

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teammembers').del()
  await knex('teammembers').insert([
    {
      email: "test@email.com",
      projectid: 1,
      acceptedinvite: true
    },
    {
      email: "matthyde@email.com",
      projectid: 2,
      acceptedinvite: true
    },
    {
      email: "test@email.com",
      projectid: 2,
      acceptedinvite: true
    },
    {
      email: "test@email.com",
      projectid: 3,
      acceptedinvite: true
    },
    {
      email: "test@email.com",
      projectid: 3,
      acceptedinvite: null
    }
  ]);
};
