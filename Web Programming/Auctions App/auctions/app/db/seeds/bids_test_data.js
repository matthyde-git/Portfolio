/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('bids').del()
    await knex('bids').insert([
      {
        auctionid: 1, 
        username: 'test',
        bid: 150
      }
    ]);
  };