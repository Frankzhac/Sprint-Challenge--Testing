const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  getAll,
  getById
};

function insert(game) {
  return db('games')
    .insert(game, 'id', 'title', 'genre', 'releaseYear')
    .then(ids => {
      return db('games')
        .where({ id: ids[0] })
        .first();
    });
}

function getAll() {
  return db('games');
}

function getById(id) {
  return db('games')
    .where({ id })
    .first();
}
