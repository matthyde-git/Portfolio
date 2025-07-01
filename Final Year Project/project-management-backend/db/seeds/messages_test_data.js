/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// seed file with test data for the messages table

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('messages').del()
  await knex('messages').insert([
    {
      projectid: 1, 
      message: "Hello everyone, welcome to the project.",
      user: "test@email.com",
      replyingto: null
    },
    {
      projectid: 1, 
      message: "Risks and tasks will be available soon.",
      user: "test@email.com",
      replyingto: 1
    }
  ]);
};
