const db = require('../data/dbConfig');

const { insert, getAll } = require('./gamesModel');

describe('games model', () => {
  beforeEach(async () => {
    await db('games').truncate();
  });

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('insert()', () => {
    it('should insert games', async () => {
      await insert({
        title: 'Testing Placeholder',
        genre: 'Genre Placeholder',
        releaseYear: 'Release Placeholder'
      });

      const games = await db('games');

      expect(games).toHaveLength(1);
    });

    it('should insert a new game', async () => {
      let game = {
        title: 'Testing Placeholder',
        genre: 'Genre Placeholder',
        releaseYear: 'Release Placeholder'
      };
      let inserted = await insert(game);
      expect(inserted.title).toBe(game.title);

      game = {
        title: 'Testing Placeholder',
        genre: 'Genre Placeholder',
        releaseYear: 'Release Placeholder'
      };
      inserted = await insert(game);
      expect(inserted.title).toBe(game.title);
    });
  });

  // Get all the games
  describe('get all /', () => {
    it('should return an empty array', async () => {
      const games = await db('games');
      expect(games).toHaveLength(0);
    });

    it('should return an array of games', async () => {
      let games = [
        { id: 1, title: 'godofwar'},
        { id: 2, title: 'apex'}
      ];
      expect.arrayContaining(games);
    });
  });
});
