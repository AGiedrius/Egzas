// Kategorijų modelis: DB užklausos
const db = require('../db');

exports.gautiVisas = async () => {
    const result = await db.query('SELECT * FROM kategorijos');
    return result.rows;
};
exports.create = async ({ pavadinimas, aprasymas }) => {
    const sql = 'INSERT INTO kategorijos (pavadinimas, aprasymas) VALUES ($1, $2) RETURNING *';
    const params = [pavadinimas, aprasymas || null];
    console.log('[Kategorijos CREATE SQL]:', sql, params);
    const result = await db.query(sql, params);
    return result.rows[0];
};

exports.update = async (id, { pavadinimas, aprasymas }) => {
    const sql = 'UPDATE kategorijos SET pavadinimas = $1, aprasymas = $2 WHERE id = $3 RETURNING *';
    const params = [pavadinimas, aprasymas || null, id];
    console.log('[Kategorijos UPDATE SQL]:', sql, params);
    const result = await db.query(sql, params);
    return result.rows[0];
};

exports.deleteById = async (id) => {
    const sql = 'DELETE FROM kategorijos WHERE id = $1';
    const params = [id];
    console.log('[Kategorijos DELETE SQL]:', sql, params);
    await db.query(sql, params);
};
