const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');
const { insert } = require('../games/gamesModel');



describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    });

    describe('GET /', () => {
        it('should return 200 OK', () => {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });
        it('should return 200 OK using async and await', async () => {
            const res = await request(server).get('/')

            expect(res.status).toBe(200);
        });

        it('should return JSON', () => {
            return request(server).get('/')
            .then(res => {
                expect(res.type).toBe('application/json');
            });
        });

        it('should return {message: "API is up"}', () => {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.body).toEqual({message: "API is up"});
            }); // toEqual matcher is used for testing objects
        });
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
        title: 'Pacman 2',
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

});
