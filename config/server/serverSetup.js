const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('./characters.db');

app.get('/api/characters', (req, res) => {
    db.all("SELECT * from characters", [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.get('/api/locations', (req, res) => {
  db.all("SELECT * from locations", [], (err, rows) => {
      if (err) {
          res.status(400).json({"error": err.message});
          return;
      }
      res.json({
          "message": "success",
          "data": rows
      });
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

db.wait()
