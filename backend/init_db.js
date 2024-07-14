const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/places.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    location TEXT,
    description TEXT,
    image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    place_id INTEGER,
    name TEXT,
    description TEXT,
    rating INTEGER,
    FOREIGN KEY(place_id) REFERENCES places(id)
  )`);
});

db.close();
console.log('Database initialized.');
