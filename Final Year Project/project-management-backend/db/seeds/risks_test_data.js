/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// seed file with test data for the risks table

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('risks').del()
  await knex('risks').insert([
    {
      projectid: 1, 
      title: "Fail to implement features",
      category: "Requirements",
      impact: "Project failure",
      impactlevel: 5,
      likelihood: 2,
      control: "Create and follow UML models of the system",
      response: "Research techniques for implmenting the key features",
      priority: 3
    }
  ]);
};
