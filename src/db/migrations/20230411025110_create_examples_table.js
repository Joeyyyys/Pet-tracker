// REMEMBER: up and down are functions that MUST return promises
// You'll probably want to delete this file, it just has some examples to copy if you need
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('pets', (table) => {
      table.increments(); // this is the id
      table.string('pet_name'); // text for the pet name 
      table.string('profile_picture'); // text for the profile picture img link
      table.string('species'); // text for the type of species the user picks 
      table.boolean('is_friendly').defaultTo(false); // boolean, optional default
  
      /* add a foreign key that links to a hypothetical users table */
      // You must first have created a users table with a key called id!
      // table.integer('user_id').index().references('id').inTable('users');
    });
  };
  
  // What goes up must come down: all down does is reverse up's actions
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('pets');
  };