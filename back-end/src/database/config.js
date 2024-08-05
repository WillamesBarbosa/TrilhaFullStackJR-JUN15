const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

// function that creates the database file and tables
async function database() {
  try {
    const db = await open({
      filename: path.resolve(__dirname, './database.db'),
      driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users(
          id UUID PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT
          role TEXT DEFAULT 'user'
          )
      `);

    await db.exec(`CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        user_id UUID NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    return db;
  } catch (error) {
    console.log(error);
    throw new Error('Houve um problema ao conectar-se ao banco de dados.');
  }
}

module.exports = database;
