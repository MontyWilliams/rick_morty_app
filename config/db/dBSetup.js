const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('characters.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS characters (name TEXT, species TEXT, location TEXT, status TEXT, gender TEXT, origin TEXT, episode TEXT, image TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS locations (name TEXT, type TEXT, dimension TEXT, residents TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT  UNIQUE NOT NULL, password_hash TEXT NOT NULL, email NOT NULL) ")
});

db.close();
