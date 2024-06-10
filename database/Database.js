import * as SQLite from "expo-sqlite"

async function openDB() {
  return await SQLite.openDatabaseAsync("lista-de-compras")
}

/**@param {SQLite.SQLiteDatabase} db */
async function createUsuario(db) {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );`
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function insertUsuarios(db, email, senha) {
  return await db.runAsync(
    `INSERT INTO usuarios (email, senha) values (?, ?);`, email, senha
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function selectUsuario(db, email, senha) {
  return await db.getFirstAsync(
    `SELECT id FROM usuarios where email = ? and senha = ?;`, email, senha
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function createListas(db) {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS listas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      data DATE NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );`
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function selectListas(db, id) {
  return await db.getAllAsync(
    `SELECT nome, data, id FROM listas where usuario_id = ?;`, id
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function insertListas(db, nome, data, id) {
  return await db.runAsync(
    `INSERT INTO listas (nome, data, usuario_id) values (?, ?, ?);`, nome, data, id
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function deleteListas(db, data) {
  return await db.runAsync(
    `DELETE FROM listas where data = ?;`, data
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function createItens(db) {
  return await db.execAsync(
    `CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lista_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      valor REAL NOT NULL,
      FOREIGN KEY (lista_id) REFERENCES listas(id) ON DELETE CASCADE
    );`
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function insertItens(db, nome, valor, id) {
  return await db.runAsync(
    `INSERT INTO itens (nome, valor, lista_id) values (?, ?, ?);`, nome, valor, id
  )
}

/**@param {SQLite.SQLiteDatabase} db */
async function selectItens(db, id) {
  return await db.getAllAsync(
    `SELECT id, nome, valor FROM itens where lista_id = ?;`, id
  )
}

export {
  openDB,
  createUsuario, 
  insertUsuarios, 
  selectUsuario,
  createListas, 
  selectListas, 
  insertListas, 
  deleteListas, 
  createItens, 
  insertItens,
  selectItens
}
