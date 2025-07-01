/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// seed file with test data for the tasks table

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {
      title: "Code the backend",
      description: "The system's backend needs to be coded in Express.js",
      status: "In progress",
      assignedto: "test@email.com",
      deadline: "2025-05-23 00:00:00",
      projectid: 1
    },
    {
      title: "Code the frontend",
      description: "The system's frontend needs to be coded in React.js",
      status: "In progress",
      deadline: "2025-05-23 00:00:00",
      projectid: 1
    },
  ]);
};
