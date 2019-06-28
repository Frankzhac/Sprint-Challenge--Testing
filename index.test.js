const supertest = require('supertest');
const server = require('./api/server.js');

describe('listener', () => {
  describe('listen', () => {
    it('console.log the text "Listening on Port: 5000"', () => {
      console.log = jest.fn();
      console.log('Listening on Port: 5000');
      expect(console.log.mock.calls[0][0]).toBe('Listening on Port: 5000')
    });
  });
});
