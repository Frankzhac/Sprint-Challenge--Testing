const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API is up' });
});

server.get('/games', (req, res) => {
  Games.getAll()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/games', async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre || !releaseYear) {
    res.status(400).json({
      errorMessage: "Please provide game all info."
    });
  }
  // add/save new game in the db

  Games.insert({
    title,
    genre,
    releaseYear
  })
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({
          success: false,
          error: "There was an error while saving the game to the database",
        });
      });
});

// server.post('/games', async (req, res) => {
//   const gameData = req.body;
//   const currentGameData = await games.getAll();
//   const currentGameTitles = currentGameData.map(obj => obj.title);
//
//   if (currentGameTitles.includes(gameData.title)) {
//     res.status(405).json({ message: `Error: Title already exists` });
//   } else if (gameData.title && gameData.genre && gameData.releaseYear) {
//     const newGameData = await games.insert(gameData);
//     res.status(201).json(newGameData);
//   } else {
//     res.status(500).json({ message: `Error: Internal Server Error` });
//   }
// });

module.exports = server;
