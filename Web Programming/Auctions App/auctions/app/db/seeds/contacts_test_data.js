/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('contacts').del()
    await knex('contacts').insert([
      {firstname: "John", lastname: "Doe", email: "jd@email.com"}    
    ]);
  };