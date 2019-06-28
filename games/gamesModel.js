const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  getAll,
  remove,
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

function remove(id) {
  return db('hobbits')
  .where({ id })
  .del()
}

function getAll() {
  return db('games');
}

function getById(id) {
  return db('games')
    .where({ id })
    .first();
}
