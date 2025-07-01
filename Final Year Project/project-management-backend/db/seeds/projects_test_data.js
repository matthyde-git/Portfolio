/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// seed file with test data for the projects table

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects').del()
  await knex('projects').insert([
    {
      title: "Building a project management system",
      teamleader: "test@email.com",
      description: "We will be designing, building, testing and deploying a project management system.",
      status: "In progress",
      deadline: "2025-05-23 00:00:00"
    },
    {
      title: "Test Project",
      teamleader: "matthyde@email.com",
      description: "This project will be for testing the non-team leader features.",
      status: "In progress",
      deadline: "2025-05-23 00:00:00"
    },
    {
      title: "Invite Test Project",
      teamleader: "matthyde@email.com",
      description: "This project will be for testing the invite notifications.",
      status: "In progress",
      deadline: "2025-05-23 00:00:00"
    }
  ]);
};
