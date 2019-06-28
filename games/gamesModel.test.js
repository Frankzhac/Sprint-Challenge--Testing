const db = require('../data/dbConfig');

const { insert, getAll } = require('./gamesModel');

describe('GAMES MODEL', () => {
  beforeEach(async () => {
    await db('games').truncate();
  });

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('INSERT()', () => {
    it('should insert games', async () => {
      await insert({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: '1980'
      });

      const games = await db('games');

      expect(games).toHaveLength(1);
    });

    it('should insert new game', async () => {
      let game = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: '1980'
      };
      let inserted = await insert(game);
      expect(inserted.title).toBe(game.title);

      game = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: '1980'
      };
      inserted = await insert(game);
      expect(inserted.title).toBe(game.title);
    });
  });
  describe('GET ALL /', () => {
    it('should return an empty array', async () => {
      const games = await db('games');

      expect(games).toHaveLength(0);
    });

    it('should return an array of games', async () => {
      let games = [
        { id: 1, title: 'godofwar' },
        { id: 2, title: 'apex' }
      ];
      expect.arrayContaining(games);
    });
  });
});
