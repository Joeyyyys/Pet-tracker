const knex = require('./knex');

class Pets {
  // This is just an example query, obviously you need to change it, but it shows you how to use knex.raw and dynamic values
  static async create(body) {
    try {
      console.log('Body object:', body)
      const { pet_name, profile_picture, species, is_friendly } = body;
      const query = `INSERT INTO pets (pet_name, profile_picture, species, is_friendly) VALUES   (?, ?, ?, ?) RETURNING *`;
      const response = await knex.raw(query, [pet_name, profile_picture, species, is_friendly]);
      return response.rows[0];
    } catch (err) {
      console.error(err);
      return null;
      
    }
  }

  static async list() {
    try {
      const query = 'SELECT * FROM pets';
      const response = await knex.raw(query);
      return response.rows || [];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async remove(petId) {
    try {
        const query = 'DELETE FROM pets WHERE id = ? RETURNING *';
        const { rows: [removedPet] } = await knex.raw(query, [petId]);
        return removedPet;
      } catch (err) {
        console.error(err);
        return null;
      }
  }
}

module.exports = Pets;