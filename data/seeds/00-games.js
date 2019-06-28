
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'Pacman'},
        {id: 2, title: 'God of War'},
        {id: 3, title: 'rowValue3'}
      ]);
    });
};
