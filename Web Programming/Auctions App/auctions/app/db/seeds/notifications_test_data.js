/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('notifications').del()
    await knex('notifications').insert([
      {
        email: "jd@test.com", 
        auctiontitle: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
        Message: `You've been outbidded on ${auctiontitle}`
      }
    ]);
  };