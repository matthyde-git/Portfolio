/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('orders').del()
    await knex('orders').insert([
      {
        email: "jd@email.com",
        item: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 150,
        firstname: "John",
        lastname: "Doe",
        address: "Address",
        cardnumber: 1111222233334444,
        expirydate: "01/01/2025",
        cvv: 123
      }
    ]);
  };