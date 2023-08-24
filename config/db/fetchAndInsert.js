const sqlite3 = require('sqlite3').verbose();
const axios = require('axios')
const bcrypt = require('bcrypt')

const db = new sqlite3.Database('characters.db');

async function fetchAndInsertCharacters() {
  let page = 1
  let hasNextPage = true

  // I like this while statement nice and simple algorithm that can be used for chars and locations
  while(hasNextPage) {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
    const data = response.data;
    const characters = data.results;
  
  // Insert chars into DB

  const stmt = db.prepare("INSERT INTO characters (name, species, location, status, gender, origin, episode, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  characters.forEach(character => {
    stmt.run(character.name, character.species, character.location, character.status, character.gender, character.origin, character.episode, character.image)
  })
  stmt.finalize();

  if (data.info.next) {
    page++;
  } else {
    hasNextPage = false;
  }
  }
}

async function fetchAndInsertLocations() {
  let page = 1
  let hasNextPage = true

  // I like this while statement nice and simple algorithm that can be used for chars and locations
  while(hasNextPage) {
    const response = await axios.get(`https://rickandmortyapi.com/api/location/?page=${page}`)
    const data = response.data;
    const locations = data.results;
  
  // Insert chars into DB

  const stmt = db.prepare("INSERT INTO locations (name, type, dimension, residents) VALUES (?, ?, ?, ?)");
  locations.forEach(location => {
    stmt.run(location.name, location.type, location.dimension, location.residents)
  })
  stmt.finalize();

  if (data.info.next) {
    page++;
  } else {
    hasNextPage = false;
  }
  }
}

async function addUser(userName, password, email) {
try {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const stmp = db.prepare(
    "INSERT INTO users (userName, password_hash, email) VALUES (?, ?, ?)"
  );

  stmp.run(userName, hashedPassword, email)
  stmp.finalize()
  
  console.log("Yea, Yea, user added Bruh")
} catch (error) {
  console.error('Somethin F(#$d up tryna add the user', error)
}

}

(async () => {
  await fetchAndInsertCharacters();
  await fetchAndInsertLocations();
  await addUser('john_doe', 'secretpassword', 'john@example.com')
  db.close();
})()

